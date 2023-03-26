from __main__ import app
from flask import Flask, request, jsonify
import requests
import json
import math
from collections import defaultdict
import random
import time
import configparser
import logging

@app.route("/Music", methods=['GET'])
def get_song_recommendations():
    track = "1Qrg8KqiBpW07V7PNxwwwL"
    # Get features of input track
    input_features = get_features(track)
    # Get song recommendations
    recommendations = get_recommendations(track)
    return json.dumps(analyze_feature_dist(input_features, recommendations))

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

def get_features(track):
    header = {'Authorization': "Bearer " + get_token()}
    URL = f'https://api.spotify.com/v1/audio-features/{track}'
    track_features = requests.get(url = URL, headers=header)
    return track_features.json()

def get_data(track):
    header = {'Authorization': "Bearer " + get_token()}
    URL = f'https://api.spotify.com/v1/tracks/{track}'
    data = requests.get(url = URL, headers=header).json()
    track_data = defaultdict(str, data)
    return {
        'album name': track_data.get("album").get("name"),
        'album image': track_data.get("album").get("images")[0].get("url"), 
        'track name': track_data.get('name'),
        'artist name': track_data.get('artists')[0].get('name'),
        'sample': track_data.get('preview_url'), 
        'genres': track_data.get("album").get("genres")
    }

def gaussian(x, y, sigma = 1):
    exponent = -((x - y) ** 2) / (2 * sigma ** 2)
    return math.exp(exponent)

def calc_dist(input_features, new_features):
    similarity = {}
    feature_set = {
        "Acousticness", "danceability", "energy", "key", "liveness", "loudness", "tempo"
    }
    for input_feature, new_feature in zip(input_features.keys(), new_features.keys()):
        if input_feature in feature_set: 
            similarity[input_feature] = gaussian(int(input_features[input_feature]), int(new_features[new_feature]))
    return similarity

def get_top_spotify_tracks():
    header = {'Authorization': "Bearer " + get_token()}
    playlist = "6UeSakyzhiEt4NB3UAd6NQ"
    recommendations = []
    # get songs from the Billboard Hot 100 List
    response = requests.get(f'https://api.spotify.com/v1/playlists/{playlist}/tracks?limit=100', headers=header)
    # If the response status code is 200, then the playlist tracks were successfully retrieved
    if response.status_code == 200:
        # Extract the track details from the response JSON
        tracks = response.json()['items']
        # Get the id of the tracks
        while len(recommendations) < 20:
            track = random.choice(tracks)
            if track['track']['id'] not in recommendations: 
                recommendations.append(track['track']['id'])
    else:
        print(f'Error retrieving playlist tracks. Status code: {response.status_code}')
    return recommendations

def get_recommendations(track):
    recommendations = get_top_spotify_tracks()
    return recommendations

def analyze_feature_dist(input_track_features, recommendations):
    recommendation_data = []
    for song in recommendations: 
        # Get the recommendation song details (title, artist, etc)
        song_details = get_data(song)
        # Analayze the feature difference between old song and new song
        song_feature_info = calc_dist(input_track_features, get_features(song))
        # Bundle the song data and feature difference data
        recommendation_data.append(song_details)
        recommendation_data.append(song_feature_info)
    return recommendation_data

@app.route('/Autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query')
    if query:
        # Set up the Spotify API endpoint and parameters
        endpoint = 'https://api.spotify.com/v1/search'
        params = {
            'q': query,
            'type': 'track',
            'limit': 5
        }
        headers = {'Authorization': 'Bearer ' + get_token()}
        # Call the Spotify API
        response = requests.get(endpoint, params=params, headers=headers)
        if response.status_code == 200:
            # Extract the track names from the response JSON
            data = response.json()
            return data
        else:
            print(f'Error retrieving autocomplete suggestions. Status code: {response.status_code}')
    return []