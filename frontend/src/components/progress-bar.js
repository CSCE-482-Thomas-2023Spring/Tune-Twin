import React, { useEffect, useState } from "react";
import "../style/progress-bar.css";

const ProgressBar = ({ bgcolor, progress, height }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (progress > 0) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(0);
    }
  }, [progress]);

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

  const Childdiv = {
    height: "100%",
    margin: 0,
    width: `${currentProgress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
    transition: "width 1s ease-in-out"
  };

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
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;