from __main__ import app
from flask import Flask, request, redirect, url_for, jsonify
import spotipy
import configparser
from spotipy.oauth2 import SpotifyOAuth
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
CONNECTION_STRING = "mongodb+srv://r779:Toadapple1@tunetwin.qa1jxnx.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)
config = configparser.ConfigParser()
config.read('spotify.cfg')
CLIENT_ID = config.get('Spotify', 'CLIENT_ID')
CLIENT_SECRET = config.get('Spotify', 'CLIENT_SECRET')

def create_oauth():

    return SpotifyOAuth(
        client_id = CLIENT_ID,
        client_secret = CLIENT_SECRET,
        redirect_uri=url_for('callback', _external = True),
        scope='user-read-email playlist-modify-public playlist-modify-private'
    )

@app.route('/callback', methods=['GET'])
def callback():
    user_email = request.args.get("email")
    user = client.TuneTwin.users.find_one({"email": user_email})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    code = request.args.get('code')
    sp_oauth = create_oauth()
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info['access_token']
    client.TuneTwin.users.update_one({"email": user_email}, {"$set": {"spotify_token": access_token}})
    # This final Redirect will go back to our homepage after the spotify login
    return redirect(url_for('exportSongs'))

@app.route('/loginToSpotify')
def loginSpotify():
    sp_oauth = create_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/exportSongs', methods=['POST'])
def export_to_spotify():
    user_email = request.form.get('email')
    user = client.TuneTwin.users.find_one({"email": user_email})
    if not user:
        return jsonify({"error": "User not found"}), 404
    access_token = user['spotify_token']
    sp = spotipy.Spotify(auth=access_token)

    # Get the tracks to be exported from the request
    track_uris = request.form.getlist('track_uris[]')

    # Create a new playlist for the user
    playlist_name = "Exported from TuneTwin"
    playlist = sp.user_playlist_create(user['spotify_token'], playlist_name, public=False)

    # Add the tracks to the playlist
    sp.user_playlist_add_tracks(user['spotify_token'], playlist['id'], track_uris)

    return jsonify({"success": "Tracks exported to Spotify"})