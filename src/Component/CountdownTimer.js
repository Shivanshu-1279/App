
import React, { useState, useEffect } from 'react';
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleChange = (event) => {
    const newTime = parseInt(event.target.value, 10);
    setTime(newTime);
  };

  useEffect(() => {
    let interval;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

      return () => clearInterval(interval);
  }, [isRunning, time]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <label>Edit Timer (in seconds): </label>
        <input type="number" value={time} onChange={handleChange} />
      </div>
      <div>
        <p>Current Countdown Time: {time} seconds</p>
      </div>
      <div>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
