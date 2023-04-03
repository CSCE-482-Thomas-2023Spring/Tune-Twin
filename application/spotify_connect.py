from __main__ import app
from flask import Flask, request, redirect
import spotipy
import configparser
from spotipy.oauth2 import SpotifyOAuth

config = configparser.ConfigParser()
config.read('spotify.cfg')
sp_oauth = SpotifyOAuth(
    CLIENT_ID = config.get('Spotify', 'CLIENT_ID'),
    CLIENT_SECRET = config.get('Spotify', 'CLIENT_SECRET'),
    redirect_uri='http://localhost:5000/callback',
    scope='user-read-email'
)
@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info['access_token']
    # Store the access token in a session or database for later use
    return redirect('/')

@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)