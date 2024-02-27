import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'
const CountdownTimer = () => {
  //const initialTimeInSeconds = 2 * 60 * 60; 
  const initialTimeInSeconds=0;
  const [seconds, setSeconds] = useState(initialTimeInSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRunning, seconds]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(initialTimeInSeconds);
  };

  const handleEdit = (event) => {
    const newSeconds = parseInt(event.target.value, 10);
    if (!isNaN(newSeconds) && newSeconds >= 0) {
      setSeconds(newSeconds);
    }
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-container">
      <div className="countdown-display">Countdown: {formatTime(seconds)}</div>
      <button className="control-button start" onClick={handleStart}>Start</button>
      <button className="control-button stop" onClick={handleStop}>Stop</button>
      <button className="control-button reset" onClick={handleReset}>Reset</button>
      <input
        className="edit-input"
        type="number"
        placeholder="Edit countdown time (in seconds)"
        value={seconds}
        onChange={handleEdit}
        disabled={isRunning}
      />
    </div>
  );
};

export default CountdownTimer;
