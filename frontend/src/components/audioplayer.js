import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import '../style/audioplayer.css';
import '../style/recc-list.css';

function AudioPlayer({ audioSrc, imageSrc, id, handlePlay }) {
  // Create a reference to the audio element
  const audioRef = useRef(null);

  // Define a state variable to track the playing state of the audio
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Get the audio element from the reference
    const audio = audioRef.current;

    // Define a function to handle the play event
    const handlePlayEvent = () => {
      setIsPlaying(true);
    };

    // Define a function to handle the pause event
    const handlePauseEvent = () => {
      setIsPlaying(false);
    };

    // Add event listeners to the audio element for play and pause events
    audio.addEventListener("play", handlePlayEvent);
    audio.addEventListener("pause", handlePauseEvent);

    // Clean up the event listeners when the component is unmounted
    return () => {
      audio.removeEventListener("play", handlePlayEvent);
      audio.removeEventListener("pause", handlePauseEvent);
    };
  }, []);

  // Define a function to handle the ended event of the audio
  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="ImageContainer">
      {/* Song Preview */}
      <audio id={id} src={audioSrc} ref={audioRef} onEnded={handleEnded} data-testid="audio-element" />

      {/* Album Image */}
      <img src={imageSrc} alt="album-cover" />

      {/* Play/Pause button */}
      {audioSrc ? (
        <button className="play-pause" data-testid="audio-button" onClick={() => handlePlay(id)} style={{ margin: 0 }}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} data-testid="pause-icon" />
          ) : (
            <FontAwesomeIcon icon={faPlay} data-testid="play-icon" />
          )}
        </button>
      ) : (
        // Displayed when no audio source is provided
        <div style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.2)", color: "rgba(255, 255, 255, 0.8)", textAlign: "center", userSelect: "none" }}>
          No Preview
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;