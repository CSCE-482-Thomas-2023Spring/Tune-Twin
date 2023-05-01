import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/recc-list.css';
import { Link } from 'react-router-dom';
import AudioPlayer from './audioplayer.js';
import ProgressBar from './progress-bar'
import { act } from 'react-dom/test-utils';

function ReccList(props) {
  // Initializing state variables with useState hook
  const [recommendations, setRecommendations] = useState([]);
  const [currentAudioPlayer, setCurrentAudioPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);

  const location = useLocation();

  // Defining an effect hook that triggers when the search spotify id changes
  useEffect(() => {
    // Fetch url
    const urlParams = new URLSearchParams(window.location.search);
    const trackId = decodeURIComponent(urlParams.get('trackId'));

    // Define an async function to fetch recommendations data from a backend API
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        const request = {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const url = new URL(`http://127.0.0.1:8000/Music`);
        url.searchParams.append('query', trackId);
        url.searchParams.append('user_email', props.userId ? props.userId : "none");
        url.searchParams.append('acousticness', props.filters.acoustics);
        url.searchParams.append('danceability', props.filters.danceability);
        url.searchParams.append('energy', props.filters.energy);
        url.searchParams.append('key', props.filters.keys);
        url.searchParams.append('liveness', props.filters.liveness);
        url.searchParams.append('loudness', props.filters.loudness);
        url.searchParams.append('mode', props.filters.mode);
        url.searchParams.append('tempo', props.filters.tempo);
        url.searchParams.append('valence', props.filters.valence);

        fetch(url)
          .then(response => response.json())
          .then(data => {
            // process response data
          })
          .catch(error => {
            console.error('Error:', error);
          });

        const response = await fetch(url);
        const data = await response.json();
        // Define an async function to fetch recommendations data from a backend API
        const merged_list = data.reduce((acc, item, index) => {
          if (index % 2 === 0) {
            acc.push({
              id: item["track id"],
              album_name: item["album name"],
              album_image: item["album image"],
              track_name: item["track name"],
              artist_name: item["artist name"],
              artist_id: item["artist id"],
              sample: item["sample"],
              genres: item["genres"]
            });
          } else {
            const songData = acc[acc.length - 1];
            songData.danceability = item.danceability;
            songData.energy = item.energy;
            songData.songKey = item.key;
            songData.loudness = item.loudness;
            songData.liveness = item.liveness;
            songData.tempo = item.tempo;
          }
          return acc;
        }, []);
        
        // Only enabled during testing
        // act(() => {
          setIsLoading(false);
          setRecommendations(merged_list);
        // });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchRecommendations();
  }, [props.spotifyId, location]);

  // Defining a function to handle audio playback
  const handleAudioPlay = (key) => {
    // If the current audio player is the same as the clicked element
    if (currentAudioPlayer === key) {
      // Pause or play the audio depending on its current state
      const audio = document.getElementById(key);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {

      // If a different audio player is currently playing
      // Pause the previous audio player and update its corresponding button text
      const prevAudioPlayer = document.getElementById(currentAudioPlayer);
      if (prevAudioPlayer) {
        prevAudioPlayer.pause();
        const prevAudioButton = document.getElementById(`${currentAudioPlayer}-button`);
        if (prevAudioButton) prevAudioButton.innerHTML = "Play";
      }

      // Play the clicked audio player and update the current audio player state
      const audio = document.getElementById(key);
      audio.play();
      setCurrentAudioPlayer(key);
    }
  }

  useEffect(() => {

    // Set an interval to update the dots state variable every 500 milliseconds
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);

    // Return a cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  // Defining a function to add an item to the user's blacklist
  const addToBlacklist = async (type, content) => {

    const request = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    }

    if (type === "song") {
      request.body = JSON.stringify({
        email: props.userId,
        blacklist_songs_to_add: content
      });
    } else {
      request.body = JSON.stringify({
        email: props.userId,
        blacklist_artists_to_add: content
      });
    }

    const response = await fetch(`http://localhost:8000/Profile/UpdateDetails`, request);

    if (response.status != 200) {
      console.log("blacklist add FAILED, ERROR " + response.status);
    }
  }

  // Defining a function to render the recommendations list
  function renderRecommendations(recommendations) {
    // Map each recommendation to a div element containing its information
    return recommendations.map((element) => (
      <div
        key={element.id}
        onMouseEnter={() => setHoveredElement(element)}
        onMouseLeave={() => setHoveredElement(null)}
        className="ItemContainer"
        data-testid="recc-list"
      >
        <AudioPlayer
          audioSrc={element.sample}
          imageSrc={element.album_image}
          id={element.id}
          handlePlay={() => handleAudioPlay(element.id)}
          data-testid="audio-player"
        />
        <Link
          to={`https://open.spotify.com/track/${element.id}`}
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <div className="SongInfo">
            <h2 className="song-title">
              {element.track_name}
            </h2>
            <hr
              style={{
                background: "black",
                color: "black",
                border: "none",
                height: ".05rem",
                width: "200px"
              }}
            />
            <h3 className="artist-name">
              {element.artist_name}
            </h3>
          </div>
        </Link>
        {(props.userId === "-1") ? null : (
          <div className="button-container">
            <button
              className="block-button"
              style={{ height: '2rem' }}
              onClick={(e) => {
                e.stopPropagation();
                addToBlacklist("song", [element.id]);
              }}
            >
              Block Song
            </button>
            <button
              className="block-button"
              onClick={(e) => {
                e.stopPropagation();
                addToBlacklist("artist", [element.artist_id]);
              }}
            >
              Block Artist
            </button>
          </div>
        )}
        {hoveredElement && hoveredElement.id === element.id && (
          <div className="Tooltip">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Danceability:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.danceability * 100)}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Energy:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.energy * 100)}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Key:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.songKey * 100)}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Liveness:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.energy * 100)}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Tempo:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.tempo * 100)}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
          </div>
        )}
      </div>
    ));
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader">Loading{dots}</div>
      ) : (
        <div className="ReccList">
          {renderRecommendations(recommendations)}
        </div>
      )}
    </div>
  );

};

export default ReccList;