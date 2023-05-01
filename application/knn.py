import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MinMaxScaler
import configparser
from sklearn.neighbors import KDTree
import pickle
import os.path
import numpy as np
from spotify_helper_functions import get_token
import requests

config = configparser.ConfigParser()
config.read("spotify.cfg")
CLIENT_ID = config.get("Spotify", "CLIENT_ID")
CLIENT_SECRET = config.get("Spotify", "CLIENT_SECRET")
client_credentials_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
print("CRED: ", CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)



def get_track_features(track_id):
    # print("TRACK ID: ", get_song_data([track_id]))
    # track_info = sp.track(track_id)
    # print("TRACK INFO: ", track_info)
    # track_features = sp.audio_features(track_id)
    header = {'Authorization': "Bearer " + get_token()}
    URL = f'https://api.spotify.com/v1/tracks/{track_id}'
    track_info = requests.get(url = URL, headers=header).json()
    FEATURE_URL = f'https://api.spotify.com/v1/audio-features?ids={track_id}'
    track_features = requests.get(url = FEATURE_URL, headers=header).json()
    print("TRACK FEATURES; ", track_features)
    track_features = track_features['audio_features']
    features = {
        "id": track_id,
        "name": track_info["name"],
        "album": None, 
        "album_id":None, 
        "artists": track_info["artists"][0]["name"],
        "artist_ids": None, 
        "danceability": track_features[0]["danceability"],
        "energy": track_features[0]["energy"],
        "key": track_features[0]["key"],
        "loudness": track_features[0]["loudness"],
        "mode": track_features[0]["mode"],
        "speechiness": track_features[0]["speechiness"],
        "acousticness": track_features[0]["acousticness"],
        "instrumentalness": track_features[0]["instrumentalness"],
        "liveness": track_features[0]["liveness"],
        "valence": track_features[0]["valence"],
        "tempo": track_features[0]["tempo"],
    }
    return features


def get_nearest_neighbors(track_id, features, k, use_cache=True):
    cache_file = "kdtree_cache.pkl"
    if use_cache and os.path.isfile(cache_file):
        # Load k-d tree from cache
        with open(cache_file, "rb") as f:
            print('opening from cache')
            tree = pickle.load(f)
        with open("dataframe.pickle", "rb") as f:
            track_df = pickle.load(f)
    else:
        track_df = pd.read_csv("songdatamerge.csv")
        scaler = MinMaxScaler()

        targetFeatures = [
           "acousticness" ,
        "danceability" ,
        "energy",
        "liveness",
        "loudness",
        "mode" , 
        "tempo" ,
        "valence" 
        ]

        # All feature data for a track will be between columns 6 - end of the dataframe (this includes things like acousticness, danceability, etc)
        track_df_scaled = pd.DataFrame(scaler.fit_transform(track_df[targetFeatures]))
        # Build k-d tree
        tree = KDTree(track_df[targetFeatures])
        # Save k-d tree to cache
        with open(cache_file, "wb") as f:
            pickle.dump(tree, f)
        with open("dataframe.pickle", "wb") as f:
            pickle.dump(track_df, f)
    # Find nearest neighbors
    point = np.array(list(features.values()))
    _, indices = tree.query([point], k)
    nearest_neighbors = []
    for i in indices[0]:
        nearest_neighbors.append(track_df.iloc[i])
    # returns a list of data frame series object
    return nearest_neighbors
