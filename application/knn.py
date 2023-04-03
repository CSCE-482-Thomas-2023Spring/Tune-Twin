import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MinMaxScaler
import configparser

config = configparser.ConfigParser()
config.read('spotify.cfg')
CLIENT_ID = config.get('Spotify', 'CLIENT_ID')
CLIENT_SECRET = config.get('Spotify', 'CLIENT_SECRET')
client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
def get_track_features(track_id):
    track_info = sp.track(track_id)
    track_features = sp.audio_features(track_id)
    features = {
        'track_id': track_id,
        'track_name': track_info['name'],
        'artist_name': track_info['artists'][0]['name'],
        'acousticness': track_features[0]['acousticness'],
        'danceability': track_features[0]['danceability'],
        'energy': track_features[0]['energy'],
        'instrumentalness': track_features[0]['instrumentalness'],
        'key': track_features[0]['key'],
        'liveness': track_features[0]['liveness'],
        'loudness': track_features[0]['loudness'],
        'mode': track_features[0]['mode'],
        'speechiness': track_features[0]['speechiness'],
        'tempo': track_features[0]['tempo'],
        'time_signature': track_features[0]['time_signature'],
        'valence': track_features[0]['valence']
    }
    return features
def get_nearest_neighbors(track_id, k):

    # Create a dataframe of all the track features in the Spotify database
    tracks = sp.search(q='year:1900-2023', type='track', limit=50)['tracks']
    track_list = []
    for i, track in enumerate(tracks['items']):
        # Get all track feature data
        track_list.append(get_track_features(track['id']))
    track_list.append(get_track_features(track_id))
    # Compile all track data into a single dataframe
    track_df = pd.DataFrame(track_list)
    # Scale the track features to between 0 and 1
    scaler = MinMaxScaler()
    # All feature data for a track will be between columns 3 - end of the dataframe (this includes things like acousticness, danceability, etc)
    track_df_scaled = pd.DataFrame(scaler.fit_transform(track_df.iloc[:,3:]))
    # Perform KNN
    knn = NearestNeighbors(n_neighbors=k, metric='euclidean')
    knn.fit(track_df_scaled)
    # get the nearest neighbors
    distances, indices = knn.kneighbors(track_df_scaled, n_neighbors=k)
    indices = indices[-1]
    nearest_neighbors = []
    for i in indices:
        nearest_neighbors.append(track_df.iloc[i]['track_id'])
    return nearest_neighbors

input_track_id = '4Kz4RdRCceaA9VgTqBhBfa'
nearest_neighbors = get_nearest_neighbors(input_track_id, k=2)
print(nearest_neighbors)


