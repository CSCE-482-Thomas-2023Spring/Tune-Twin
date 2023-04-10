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
from profile_details_route import get_blacklist_details
from knn import get_nearest_neighbors
from knn import get_track_features
from itertools import chain


@app.route("/Music", methods=["GET"])
def get_song_recommendations():
    track = request.args.get("query")
    user_email = request.args.get("user_email")
    print("EMAILLLLL: ", user_email, "TRACK: ", track)
    features = request.args.get("features")
    # Get features of input track
    # input_features = get_features(track)
    # Get song recommendations
    recommendations = get_recommendations(track, features)
    # Filter by blacklist
    filtered_recommendations = filter_recommendations(recommendations, user_email)
    # print('filtered:')
    # print(filtered_recommendations)
    # # calculate distance between filtered recommendation and given input
    target_features = [
        "danceability",
        "energy",
        "key",
        "loudness",
        "mode",
        "speechiness",
        "acousticness",
        "instrumentalness",
        "liveness",
        "valence",
        "tempo",
    ]

    input_features = get_track_features(track)
    # print(input_features, type(input_features), type(filtered_recommendations[0]))
    for recommendation in filtered_recommendations:
        for feature in target_features:
            recommendation[feature] = gaussian(
                recommendation.get(feature), input_features.get(feature)
            )
    normalized_recomendations = [x.to_dict() for x in filtered_recommendations]
    return json.dumps(
        list(
            chain.from_iterable(
                [format_data(x.get("id"), x) for x in normalized_recomendations]
            )
        )
    )


def filter_recommendations(recommendations, user_email):
    if user_email == None:
        return recommendations
    # query for blacklist
    user_blacklist = get_blacklist_details(user_email)
    
    # filter songs
    filtered_recommendations = []
    blacklist = []
    for song in user_blacklist.get('song_list'):
        if len(song) > 0:
            blacklist.append(song[0])
    for recommendation in recommendations:
        if recommendation.get('id') not in blacklist:
            filtered_recommendations.append(recommendation)
        # for recommendation in recommendations:
        #     print("SONG: ", song[0], " REC:::", recommendation.get("id"))
        #     if len(song) > 1:
        #         # the blacklisted track id will be the first element of song
        #         if song[0] != recommendation.get("id"):
        #             filtered_recommendations.append(recommendation)
    # filter artists
    for artist in user_blacklist.get("artists"):
        for recommendation in filtered_recommendations:
            if len(artist) > 1 and len(recommendation.get("artist_ids")) > 0:
                if artist[0] == recommendation.get("artist_ids")[0]:
                    filtered_recommendations.remove(recommendation)
    return filtered_recommendations


def format_data(track, feature_info):
    header = {"Authorization": "Bearer " + get_token()}
    URL = f"https://api.spotify.com/v1/tracks/{track}"
    data = requests.get(url=URL, headers=header).json()
    track_data = defaultdict(str, data)
    print(track_data)
    return [
        {
            "album name": track_data.get("album").get("name"),
            "album image": track_data.get("album").get("images")[0].get("url"),
            "track name": track_data.get("name"),
            "track id": track_data.get("id"),
            "artist name": track_data.get("artists")[0].get("name"),
            "sample": track_data.get("preview_url"),
            "genres": track_data.get("album").get("genres"),
            "track_token": track,
        },
        {
            "danceability": feature_info.get("danceability"),
            "energy": feature_info.get("energy"),
            "key": feature_info.get("key"),
            "loudness": feature_info.get("loudness"),
            "mode": feature_info.get("mode"),
            "speechiness": feature_info.get("speechiness"),
            "acousticness": feature_info.get("acousticness"),
            "instrumentalness": feature_info.get("instrumentalness"),
            "liveness": feature_info.get("liveness"),
            "valence": feature_info.get("valence"),
            "tempo": feature_info.get("tempo"),
        },
    ]


def gaussian(x, y, sigma=1):
    exponent = -((x - y) ** 2) / (2 * sigma**2)
    return math.exp(exponent)


def get_recommendations(track, features):
    # find nearest neighbors based on track
    print(track)
    recommendations = get_nearest_neighbors(track, k=3)
    return recommendations


@app.route("/Autocomplete", methods=["GET"])
def autocomplete():
    query = request.args.get("query")
    if query:
        # Set up the Spotify API endpoint and parameters
        endpoint = "https://api.spotify.com/v1/search"
        params = {"q": query, "type": "track", "limit": 5}
        headers = {"Authorization": "Bearer " + get_token()}
        # Call the Spotify API
        response = requests.get(endpoint, params=params, headers=headers)
        if response.status_code == 200:
            # Extract the track names from the response JSON
            data = response.json()
            return data
        else:
            print(
                f"Error retrieving autocomplete suggestions. Status code: {response.status_code}"
            )
    return []


# filter_recommendations([],'roman.com')