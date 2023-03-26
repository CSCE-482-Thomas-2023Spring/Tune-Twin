from flask import Flask, request, jsonify, make_response
import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId
from __main__ import app

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

def create_blacklist(email):
    global client
    # Insert the data into the MongoDB collection
    result = client.TuneTwin.blacklist.insert_one({
            "email": email,
            "genre": [],
            "song_list": [[]],
            "artists": [[]]
        })

    new_id = str(result.inserted_id)
    return new_id

@app.route("/Account/CreateAccount", methods=["POST"])
def create_account():
    global client
    # get the user data from the request
    user_data = request.json
    password = user_data.get("password")
    email = user_data.get("email")
    first_name = user_data.get("first name")
    last_name = user_data.get("last name")
    collection = client.TuneTwin.users
    # create a new blacklist for users
    blacklist_id = create_blacklist(email)
    # insert the user data into the collection
    result = collection.insert_one(
        {
            "spotify_token": None,
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name,
            "blacklist_id": blacklist_id,
            "featurelist_id": []
        }
    )
    # check if the user insertion was successful
    if result.acknowledged:
        return jsonify({"message": "User created successfully!"})
    else:
        return jsonify({"message": "User creation failed!"})


# Login endpoint
@app.route('/Account/Login', methods=['POST'])
def login():
    # Check if the request contains the necessary data
    if not request.is_json or 'email' not in request.json or 'password' not in request.json:
        return jsonify({'error': 'Invalid request'}), 400

    # Check if the username and password are correct
    email = request.json.get('email')
    password = request.json.get('password')
    user = client.TuneTwin.users.find_one({"email": email})
    if user and user.get('password') == password:
        # Set the user cookie
        resp = make_response(jsonify({'message': 'Logged in successfully'}), 200)
        resp.set_cookie('user', email, expires=datetime.datetime.now() + datetime.timedelta(hours=24))
        return resp

    # If the credentials are incorrect, return an error
    return jsonify({'error': 'Incorrect username or password'}), 401

# Logout endpoint
@app.route('/Account/Logout', methods=['DELETE'])
def logout():
    resp = make_response(jsonify({'message': 'Logged out successfully'}), 200)
    resp.set_cookie('user', '', expires=0)
    return resp
