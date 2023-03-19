from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from __main__ import app

client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
def get_database(collection_name):
   
   collection_name = 'users'
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client.TuneTwin.users
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
    print(user)
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
    user_collection = client.TwinTune.users

    # Get the username and new email address from the request body
    username = request.json.get('username')
    new_email = request.json.get('new_email')

    # Find the user in the database and update their email address
    result = user_collection.update_one({'email': username}, {'$set': {'email': new_email}})

    if result.modified_count == 1:
        # If the update was successful, return a success message and the updated user information
        updated_user = user_collection.find_one({'email': new_email})
        user_info = {
            'name': updated_user['name'],
            'email': updated_user['email'],
            'blacklist_artists': [],
            'blacklist_songs': [],
            'feature_lists': []
        }
        id = updated_user['blacklist_id']
        objInstance = ObjectId(id)
        blacklist = client.TwinTune.black_list.find_one({"_id": objInstance})
        user_info['blacklist_artists'].append(blacklist['artist_list'])
        user_info['blacklist_songs'].append(blacklist['song_list'])
        for id in updated_user["featurelist_id"]:
            objInstance = ObjectId(id)
            feature_list = client.TwinTune.feature_list.find_one({"_id": objInstance})
            user_info['feature_lists'].append({feature_list['list_name'] : feature_list['list_of_features']})
        return jsonify({'message': 'User information updated', 'user_info': user_info}), 200
    else:
        # If the update failed (e.g. because the user wasn't found), return an error message
        return jsonify({'error': 'User not found or update failed'}), 404
    