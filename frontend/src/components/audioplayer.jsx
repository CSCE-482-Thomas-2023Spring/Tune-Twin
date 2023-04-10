import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import '../style/audioplayer.css';
import '../style/recc-list.css';

function AudioPlayer({ audioSrc, imageSrc, id, handlePlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const handlePlayEvent = () => {
      setIsPlaying(true);
    };
    const handlePauseEvent = () => {
      setIsPlaying(false);
    };
    audio.addEventListener("play", handlePlayEvent);
    audio.addEventListener("pause", handlePauseEvent);
    return () => {
      audio.removeEventListener("play", handlePlayEvent);
      audio.removeEventListener("pause", handlePauseEvent);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="ImageContainer">
      <audio id={id} src={audioSrc} ref={audioRef} onEnded={handleEnded} />
      <img src={imageSrc} alt="album" />
      {audioSrc ? (
        <button className="play-pause" onClick={() => handlePlay(id)} style={{ margin: 0 }}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
      ) : (
        <div style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.2)", color: "rgba(255, 255, 255, 0.8)", textAlign: "center", userSelect: "none"}}>No Preview</div>
      )}
    </div>
  );
}

export default AudioPlayer;