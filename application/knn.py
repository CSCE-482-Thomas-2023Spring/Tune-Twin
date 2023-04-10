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

config = configparser.ConfigParser()
config.read("spotify.cfg")
CLIENT_ID = config.get("Spotify", "CLIENT_ID")
CLIENT_SECRET = config.get("Spotify", "CLIENT_SECRET")
client_credentials_manager = SpotifyClientCredentials(
    client_id=CLIENT_ID, client_secret=CLIENT_SECRET
)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


def get_track_features(track_id):
    track_info = sp.track(track_id)
    track_features = sp.audio_features(track_id)
    features = {
        "id": track_id,
        "name": track_info["name"],
        "album": None,
        "album_id": None,
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


def get_nearest_neighbors(track, k, use_cache=False):
    cache_file = "kdtree_cache.pkl"
    target_features = [
        "danceability",
        "energy",
        "loudness",
        "mode",
        "speechiness",
        "acousticness",
        "instrumentalness",
        "liveness",
        "valence",
        "tempo",
        "key",
    ]
    if use_cache and os.path.isfile(cache_file):
        # Load k-d tree from cache
        with open(cache_file, "rb") as f:
            print("opening from cache")
            tree = pickle.load(f)
        with open("dataframe.pickle", "rb") as f:
            track_df = pickle.load(f)
    else:
        track_df = pd.read_csv("song_data.csv")[
            [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "id",
                "name",
                "album",
                "album_id",
                "artists",
                "artist_ids",
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
        ]
        scaler = MinMaxScaler()
        # All feature data for a track will be between columns 6 - end of the dataframe (this includes things like acousticness, danceability, etc)
        track_df_scaled = pd.DataFrame(
            scaler.fit_transform(track_df[
                [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15"
                ]
            ]
        ))
        track_df_scaled = np.nan_to_num(track_df_scaled, nan=0)
        # Build k-d tree
        tree = KDTree(track_df_scaled)
        # Save k-d tree to cache
        with open(cache_file, "wb") as f:
            pickle.dump(tree, f)
        with open("dataframe.pickle", "wb") as f:
            pickle.dump(track_df, f)
    # Find nearest neighbors
    # simplified_features = []
    # for feature in target_features:
    #     simplified_features.append(track_features[feature])
    # point = np.array([list(simplified_features.values())])
    print(track)
    point = []
    for i in range(0, 16):
        point.append(track[str(i)])
    print([point])
    # print(len(track_df[0]))
    _, indices = tree.query([point], k)
    nearest_neighbors = []
    for i in indices[0]:
        nearest_neighbors.append(track_df.iloc[i])
    # returns a list of data frame series object
    return nearest_neighbors


# input_track_id = "1p80LdxRV74UKvL8gnD7ky"
# nearest_neighbors = get_nearest_neighbors(input_track_id, k=20)
# for val in nearest_neighbors:
#     print(val.get('artist_ids'))
