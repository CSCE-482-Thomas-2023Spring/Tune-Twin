from flask import Flask, request, jsonify
from pymongo import MongoClient
from get_database import *
#from __main__ import app

client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
def get_database(collection_name):
   
   collection_name = 'users'
   # Provide the mongodb atlas url to connect python to mongodb using pymongo

 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['TwinTune'][collection_name]
#@app.route("/Account", methods=['POST'])
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
    

for document in get_database('users').find():
    print(document)