from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from __main__ import app

client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
def get_database(collection_name):
   
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client.TuneTwin[collection_name]
@app.route("/Account", methods=['POST'])
def signup():
    # get the user data from the request
    user_data = request.json
    print(user_data)
    username = user_data['username']
    password = user_data['password']
    email = user_data['email']


    collection = get_database('users')
    # insert the user data into the collection
    result = collection.insert_one({'username': username, 'password': password, 'email': email})

    # check if the user insertion was successful
    if result.acknowledged:
        return jsonify({'message': 'User created successfully!'})
    else:
        return jsonify({'message': 'User creation failed!'})
    

@app.route('/GetDetails', methods=['GET'])
def get_user_info():
    global client
    CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)
    
    user = client.TwinTune.users.find_one({"email": request.args.get('username')})

    print(request.args.get('username'))
    if user:
        user_info = {
            'name': user['name'],
            'email': user['email'],
            'blacklist_artists': [],
            'blacklist_songs': [],
            'feature_lists': []
        }
        id = user['blacklist_id']
        objInstance = ObjectId(id)
        blacklist = client.TwinTune.black_list.find_one({"_id": objInstance})
        user_info['blacklist_artists'].append(blacklist['artist_list'])
        user_info['blacklist_songs'].append(blacklist['song_list'])
        for id in user["featurelist_id"]:
            objInstance = ObjectId(id)
            feature_list = client.TwinTune.feature_list.find_one({"_id": objInstance})
            user_info['feature_lists'].append({feature_list['list_name'] : feature_list['list_of_features']})
        return jsonify(user_info), 200
    else:
        return jsonify({'error': 'User not found'}), 404
    
@app.route('/UpdateDetails', methods=['PUT'])
def update_user_info():
    global client
    CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)
    db = client['TwinTune']
    user_collection = db['users']
    blacklist_collection = db['black_list']
    featurelist_collection = db['feature_list']
    user_email = request.json.get('email')
    user = user_collection.find_one({"email": user_email})

    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update name, email and password
    name = request.json.get('name')
    email = request.json.get('new_email')
    password = request.json.get('password')
    if name:
        user_collection.update_one({"email": user_email}, {"$set": {"name": name}})
    if email:
        user_collection.update_one({"email": user_email}, {"$set": {"new_email": email}})
    if password:
        user_collection.update_one({"email": user_email}, {"$set": {"password": password}})
    # Update blacklist
    blacklist_artists_to_add = request.json.get('blacklist_artists_to_add')
    blacklist_songs_to_add = request.json.get('blacklist_songs_to_add')
    blacklist_artists_to_remove = request.json.get('blacklist_artists_to_remove')
    blacklist_songs_to_remove = request.json.get('blacklist_songs_to_remove')
    if blacklist_artists_to_add or blacklist_songs_to_add:
        blacklist_id = user['blacklist_id']
        objInstance = ObjectId(blacklist_id)
        blacklist = blacklist_collection.find_one({"_id": objInstance})
        if blacklist_artists_to_add:
            blacklist['artist_list'].extend(blacklist_artists_to_add)
        if blacklist_songs_to_add:
            blacklist['song_list'].extend(blacklist_songs_to_add)
        if blacklist_artists_to_remove:
            for artist in blacklist_artists_to_remove:
                blacklist['artist_list'].remove(artist)
        if blacklist_songs_to_remove:
            for song in blacklist_songs_to_remove:
                blacklist['song_list'].remove(song)
        blacklist_collection.update_one({"_id": objInstance}, {"$set": {"artist_list": blacklist['artist_list'], "song_list": blacklist['song_list']}})
    feature_list_name = request.json.get('feature_list_name')
    feature_list_to_update = request.json.get('feature_list_to_update')
    if feature_list_name:
        feature_list = {
            "list_name": feature_list_name,
            "list_of_features": []
        }
        feature_list['list_of_features'] = request.json.get('list_of_features')
        featurelist_collection.insert_one(feature_list)
        user_collection.update_one({"email": user_email}, {"$push": {"featurelist_id": str(feature_list['_id'])}})
    elif feature_list_to_update:
        feature_list_id = feature_list_to_update['_id']
        objInstance = ObjectId(feature_list_id)
        feature_list = featurelist_collection.find_one({"_id": objInstance})
        feature_list['list_name'] = feature_list_to_update['list_name']
        feature_list['list_of_features'] = feature_list_to_update['list_of_features']
        featurelist_collection.update_one({"_id": objInstance}, {"$set": {"list_name": feature_list['list_name'], "list_of_features": feature_list['list_of_features']}})
    
    return jsonify({'message': 'User updated successfully'}), 200