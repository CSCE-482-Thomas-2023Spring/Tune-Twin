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
from spotify_helper_functions import get_token

@app.route("/Music", methods=['GET'])
def get_song_recommendations():
    track = request.args.get('query')
    features = request.args.get('features')
    # Get features of input track
    input_features = get_features(track)
    # Get song recommendations
    recommendations = get_recommendations(track, features)
    print(recommendations)
    return json.dumps(analyze_feature_dist(input_features, recommendations))


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
        'track id': track_data.get('id'),
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

def get_recommendations(track, features):
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