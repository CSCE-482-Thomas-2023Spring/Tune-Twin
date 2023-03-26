from __main__ import app
from flask import Flask, request, jsonify
import requests
import json
import math
from collections import defaultdict
import random
import time
import configparser

def get_token():
    config = configparser.ConfigParser()
    config.read('spotify.cfg')
    CLIENT_ID = config.get('Spotify', 'CLIENT_ID')
    CLIENT_SECRET = config.get('Spotify', 'CLIENT_SECRET')
    auth_url = 'https://accounts.spotify.com/api/token'
    # Define the parameters to send to the Spotify API endpoint to obtain an OAuth access token
    auth_data = {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    # Load the cached token from file if it exists and is still valid
    try:
        with open('spotify_token.json', 'r') as f:
            cached_token = json.load(f)
            if cached_token['expires_at'] > time.time():
                access_token = cached_token['access_token']
                return access_token
            else:
                raise ValueError('Cached token has expired')
    except (FileNotFoundError, ValueError):
        cached_token = None

    # if the cached_token is not valid, get a new one using a post request
    if cached_token is None:
        # Send a POST request to the Spotify API endpoint to obtain an OAuth access token
        response = requests.post(auth_url, data=auth_data)
        # If the response status code is 200, then the OAuth access token was successfully retrieved
        if response.status_code == 200:
            # Extract the OAuth access token from the response JSON
            response_data = response.json()
            access_token = response_data['access_token']
            expires_in = response_data['expires_in']
            expires_at = time.time() + expires_in
            # Save the token to file for future use
            with open('spotify_token.json', 'w') as f:
                json.dump({'access_token': access_token, 'expires_at': expires_at}, f)
            return access_token
        else:
            # If the response status code is not 200, then there was an error retrieving the OAuth access token
            print(f'Error retrieving OAuth access token. Status code: {response.status_code} ')

def get_artist_data(artist_ids):
    results = []
    for artist_id in artist_ids:
        # get the picture and name of artist
        header = {'Authorization': "Bearer " + get_token()}
        URL = f'https://api.spotify.com/v1/artists/{artist_id}'
        artist = requests.get(url = URL, headers=header).json()
        # get package the artist id, name, and first image
        results.append([artist_id, artist.get("name"), artist.get("images")[0].get("url")])
    return results

def get_song_data(tracks):
    results = []
    for track in tracks:
        # get the name of the track and the picture
        header = {'Authorization': "Bearer " + get_token()}
        URL = f'https://api.spotify.com/v1/tracks/{track}'
        data = requests.get(url = URL, headers=header).json()
        # get package the track id, name, and first image
        results.append([track, data.get("name"), data.get("album").get("images")[0].get("url")])
    return results
        