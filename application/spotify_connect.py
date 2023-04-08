from __main__ import app
from flask import Flask, request, redirect, url_for
import spotipy
import configparser
from spotipy.oauth2 import SpotifyOAuth
config = configparser.ConfigParser()
config.read('spotify.cfg')
CLIENT_ID = config.get('Spotify', 'CLIENT_ID')
CLIENT_SECRET = config.get('Spotify', 'CLIENT_SECRET')
def create_oauth():

    return SpotifyOAuth(
        client_id = CLIENT_ID,
        client_secret = CLIENT_SECRET,
        redirect_uri=url_for('callback', _external = True),
        scope='user-read-email'
    )

@app.route('/callback')
def callback():
    code = request.args.get('code')
    sp_oauth = create_oauth()
    token_info = sp_oauth.get_access_token(code)
    access_token = token_info['access_token']
    # Store the access token in a session or database for later use
    return redirect('/')

@app.route('/')
def loginSpotify():
    sp_oauth = create_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)