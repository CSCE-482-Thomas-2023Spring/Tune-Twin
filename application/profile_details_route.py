from flask import Flask, request, jsonify, make_response
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from __main__ import app
from spotify_helper_functions import get_artist_data, get_song_data

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

@app.route("/Profile/GetDetails", methods=["GET"])
def get_user_info():
    global client
    # Find the user with the given email
    user = client.TuneTwin.users.find_one({"email": request.args.get("email")})
    if user:
        # Create a dictionary containing the user's information
        user_info = {
            "first_name": user.get("first_name"),
            "last_name": user.get("last_name"),
            "email": user.get("email"),
            "password": user.get("password"),
            "blacklist_artists": [],
            "blacklist_songs": [],
            "blacklist_genres": [],
            "feature_lists": [],
        }

        # If the user has a blacklist, add the artists and songs to the user_info dictionary
        id = user.get("blacklist_id")
        if id != None:
            objInstance = ObjectId(id)
            blacklist = client.TuneTwin.blacklist.find_one({"_id": objInstance})
            user_info["blacklist_artists"] = blacklist["artists"]
            user_info["blacklist_songs"] = blacklist["song_list"]
            user_info["blacklist_genres"] = blacklist["genre"]

        # For each feature list that the user has, add the name and list of features to the user_info dictionary
        for id in user["featurelist_id"]:
            objInstance = ObjectId(id)
            feature_list = client.TuneTwin.feature_list.find_one({"_id": objInstance})
            user_info["feature_lists"].append(
                {feature_list["list_name"]: feature_list["list_of_features"]}
            )

        # Return the user_info dictionary as a JSON object with a status code of 200
        return jsonify(user_info), 200

    else:
        # If the user is not found, return an error message as a JSON object with a status code of 404
        return jsonify({"error": "User not found"}), 404

def get_blacklist_details(user_email):
    blacklist_details = client.TuneTwin.blacklist.find_one({"email": user_email})
    return blacklist_details

@app.route("/Profile/UpdateDetails", methods=["PUT"])
def update_user_info():
    global client
    db = client["TuneTwin"]
    user_collection = db["users"]
    blacklist_collection = db["blacklist"]
    featurelist_collection = db["feature_list"]
    user_email = request.json.get("email")
    user = user_collection.find_one({"email": user_email})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update name, email and password
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("new_email")
    password = request.json.get("password")
    if email:
        user_collection.update_one({"email": user_email}, {"$set": {"email": email}})
    if password:
        user_collection.update_one(
            {"email": user_email}, {"$set": {"password": password}}
        )
    if first_name:
        user_collection.update_one({"email": user_email}, {"$set": {"first_name": first_name}})
    if last_name:
        user_collection.update_one({"email": user_email}, {"$set": {"last_name": last_name}})
    # Update the user's blacklist if any additions or removals are provided in the request JSON
    blacklist_artists_to_add = request.json.get("blacklist_artists_to_add") # This must contain artist ids
    blacklist_songs_to_add = request.json.get("blacklist_songs_to_add") # This must contain song ids
    blacklist_artists_to_remove = request.json.get("blacklist_artists_to_remove") # This must contain artist ids
    blacklist_songs_to_remove = request.json.get("blacklist_songs_to_remove") # This must contain song ids
    if blacklist_artists_to_add or blacklist_songs_to_add or blacklist_artists_to_remove or blacklist_songs_to_remove:
        blacklist_id = user["blacklist_id"]
        objInstance = ObjectId(blacklist_id)
        blacklist = blacklist_collection.find_one({"_id": objInstance})
        if blacklist_artists_to_add:
            # get the artist names and images associated with spotify
            artist_data = get_artist_data(blacklist_artists_to_add)
            for entry in artist_data: 
                if entry not in blacklist["artists"]:
                    blacklist["artists"].append(entry)
        if blacklist_songs_to_add:
            # get the track name and album cover
            song_data = get_song_data(blacklist_songs_to_add)
            for entry in song_data: 
                if entry not in blacklist["song_list"]:
                    blacklist["song_list"].append(entry)
        if blacklist_artists_to_remove:
            for artist_id in blacklist_artists_to_remove:
                for j, id in enumerate(blacklist["artists"]):
                    if len(id) > 0:
                        if artist_id == id[0]:
                            blacklist["artists"].pop(j)
        if blacklist_songs_to_remove:
            for song_id in blacklist_songs_to_remove:
                for j, id in enumerate(blacklist["song_list"]):
                    if len(id) > 0:
                        if song_id == id[0]:
                            blacklist["song_list"].pop(j)
        blacklist_collection.update_one(
            {"_id": objInstance},
            {
                "$set": {
                    "artists": blacklist["artists"],
                    "song_list": blacklist["song_list"],
                }
            },
        )
    # Update the user's feature lists if any additions or removals are provided in the request JSON
    feature_list_name = request.json.get("feature_list_name") # for creating a new feature list
    feature_list_to_update = request.json.get("feature_list_to_update") # for updating a feature list
    if feature_list_name:
        feature_list = {"list_name": feature_list_name, "list_of_features": []}
        feature_list["list_of_features"] = request.json.get("list_of_features")
        featurelist_collection.insert_one(feature_list)
        user_collection.update_one(
            {"email": user_email},
            {"$push": {"featurelist_id": str(feature_list["_id"])}},
        )
    elif feature_list_to_update:
        feature_list_id = feature_list_to_update["_id"]
        objInstance = ObjectId(feature_list_id)
        feature_list = featurelist_collection.find_one({"_id": objInstance})
        feature_list["list_name"] = feature_list_to_update["list_name"]
        feature_list["list_of_features"] = feature_list_to_update["list_of_features"]
        featurelist_collection.update_one(
            {"_id": objInstance},
            {
                "$set": {
                    "list_name": feature_list["list_name"],
                    "list_of_features": feature_list["list_of_features"],
                }
            },
        )

    return jsonify({"message": "User updated successfully"}), 200
