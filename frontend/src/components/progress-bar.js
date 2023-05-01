import React, { useEffect, useState } from "react";
import "../style/progress-bar.css";

const ProgressBar = ({ bgcolor, progress, height }) => {
  // State variable to track the current progress
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    // Update the progress when the 'progress' prop changes
    if (progress > 0) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 50);
      return () => clearTimeout(timer); // Cleanup the timer on unmount or when 'progress' changes
    } else {
      setCurrentProgress(0);
    }
  }, [progress]);

  // Styles for the parent div
  const Parentdiv = {
    height: height,
    width: "100px",
    margin: "5px",
    backgroundColor: "whitesmoke",
    overflow: "hidden",
    borderRadius: 40,
    position: "relative",
    zIndex: 2
  };

  // Styles for the child div (progress bar)
  const Childdiv = {
    height: "100%",
    margin: 0,
    width: `${currentProgress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
    transition: "width 1s ease-in-out"
  };

  // Styles for the progress text
  const progresstext = {
    color: "black",
    margin: 0,
    fontWeight: 900,
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)"
  };

  return (
    // Render the progress bar component
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
