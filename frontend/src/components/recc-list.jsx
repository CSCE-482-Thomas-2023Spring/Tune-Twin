import React, { useState, useEffect } from 'react';
import '../style/recc-list.css';
import AudioPlayer from './audioplayer.jsx';

function ReccList(props) {

  const [recommendations, setRecommendations] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const [currentAudioPlayer, setCurrentAudioPlayer] = useState(null);

  useEffect(() => {

    if (props.spotifyId !== "" && isShown) {
      async function fetchRecommendations() {
        const response = await fetch(`http://127.0.0.1:8000/Music?query=${props.spotifyId}`);
        const data = await response.json();
        const merged_list = data.map((item, index) => {
          if (index % 2 === 0) {
            return {
              key: item["track id"],
              album_name: item["album name"],
              album_image: item["album image"],
              track_name: item["track name"],
              artist_name: item["artist name"],
              sample: item["sample"],
              genres: item["genres"]
            };
          } else {
            return null;
          }
        }).filter(item => item !== null);

        setIsShown(false);
        setRecommendations(merged_list);
      }
      fetchRecommendations();
    }
  }, [props.spotifyId]);

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

  return (
    <div>
      <div className="AutoComplete">
        {recommendations.map((element) => (
          // React Router
          <div className = "ItemContainer" key={element.key}>
            <AudioPlayer
              audioSrc={element.sample}
              imageSrc={element.album_image}
              id={element.key}
              handlePlay={() => handleAudioPlay(element.key)}
            />
            <div className="SongInfo">
              <h2 className="song-title">{element.track_name}</h2>
              <hr
                style={{
                  background: "black",
                  color: "black",
                  border: "none",
                  height: ".05rem",
                  width: "200px"
                }}
              />
              <h3 className="artist-name">{element.artist_name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default ReccList;