import React, { useState, useEffect } from 'react';
import '../style/recc-list.css';
import { Link } from 'react-router-dom';
import AudioPlayer from './audioplayer.jsx';
import ProgressBar from './progress-bar'

function ReccList(props) {
  const [recommendations, setRecommendations] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const [currentAudioPlayer, setCurrentAudioPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    if (props.spotifyId !== "" && isShown) {
      async function fetchRecommendations() {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/Music?query=${props.spotifyId}`);
        const data = await response.json();
        const merged_list = data.reduce((acc, item, index) => {
          if (index % 2 === 0) {
            acc.push({
              id: item["track id"],
              album_name: item["album name"],
              album_image: item["album image"],
              track_name: item["track name"],
              artist_name: item["artist name"],
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

        setIsShown(false);
        setIsLoading(false);
        console.log(merged_list);
        setRecommendations(merged_list);
      }
      fetchRecommendations();
    }
  }, [props.spotifyId]);

  const addRecommendation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Music?query=${props.spotifyId}`);
      const data = await response.json();
      const newRecommendation = data.reduce((acc, item, index) => {
        if (index % 2 === 0) {
          acc.push({
            id: item["track id"],
            album_name: item["album name"],
            album_image: item["album image"],
            track_name: item["track name"],
            artist_name: item["artist name"],
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

      const uniqueNewRecommendations = newRecommendation.filter(
        newItem => !recommendations.some(existingItem => existingItem.id === newItem.id)
      );
  
      setRecommendations([...recommendations, ...uniqueNewRecommendations]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAudioPlay = (key) => {
    if (currentAudioPlayer === key) {
      const audio = document.getElementById(key);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      const prevAudioPlayer = document.getElementById(currentAudioPlayer);
      if (prevAudioPlayer) {
        prevAudioPlayer.pause();
        const prevAudioButton = document.getElementById(`${currentAudioPlayer}-button`);
        if (prevAudioButton) prevAudioButton.innerHTML = "Play";
      }
      const audio = document.getElementById(key);
      audio.play();
      setCurrentAudioPlayer(key);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        } else {
          return prevDots + ".";
        }
      });
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedRecommendations = recommendations.filter((item) => item.id !== id);
    setRecommendations(updatedRecommendations);
  };

  function renderRecommendations(recommendations) {
    return recommendations.map((element) => (
      <div
        key={element.id}
        onMouseEnter={() => setHoveredElement(element)}
        onMouseLeave={() => setHoveredElement(null)}
        className="ItemContainer"
      >
        <AudioPlayer
          audioSrc={element.sample}
          imageSrc={element.album_image}
          id={element.id}
          handlePlay={() => handleAudioPlay(element.id)}
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
        <div class="button-container">
          <button
            className="block-button"
            style={{ height: '2rem' }}
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "https://www.google.com";
            }}
          >
            Block Song
          </button>
          <button
            className="block-button"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = "https://www.google.com";
            }}
          >
            Block Artist
          </button>
        </div>
        <div class="button-container">
          <button
            className="x-button"
            style={{ width: '2rem', height: '2rem', marginLeft: '0.4rem' }}
            title="Remove Item"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveItem(element.id);
            }}
          >
            X
          </button>
        </div>
        {hoveredElement && hoveredElement.id === element.id && (
          <div className="Tooltip">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Danceability:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={element.danceability * 100}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Energy:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={element.energy * 100}
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Key:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={Math.round(element.songKey * 100)} // Use the renamed song property
                height={20}
                style={{ alignSelf: "center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ alignSelf: "center" }}>Liveness:</span>
              <ProgressBar
                bgcolor="#3BBA9C"
                progress={element.liveness * 100}
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
        <div className="AutoComplete">
          {renderRecommendations(recommendations)}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="plus-button"
              title="Add Item"
              onClick={(e) => {
                e.stopPropagation();
                addRecommendation();
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );

};

export default ReccList;