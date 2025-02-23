import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
let intervalId = 0;
function App() {
  const [second, setSecond] = useState(60 * 25);
  const [progressMax, setProgressMax] = useState(25 * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [timeVariation, setTimeVariation] = useState(25 * 60);

  function handleStart() {
    setIsStarted(true);
    intervalId = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
  }
  function handleStop() {
    clearInterval(intervalId);
  }
  function handleReset() {
    setIsStarted(false);
    handleStop();
    setSecond(timeVariation);
    setProgressMax(timeVariation);
  }

  function handleWork() {
    setSecond(25 * 60);
    setProgressMax(25 * 60);
    handleStop();
    setTimeVariation(25 * 60);
  }

  function handleBigRest() {
    setSecond(15 * 60);
    handleStop();
    setProgressMax(15 * 60);
    setTimeVariation(15 * 60);
  }

  function handleSmallRest() {
    setSecond(5 * 60);
    setProgressMax(5 * 60);
    handleStop();
    setTimeVariation(5 * 60);
  }

  function handleAddTime(seconds) {
    setSecond((prev) => prev + seconds);
    setProgressMax((prev) => prev + seconds);
  }

  const secondToView = useMemo(() => {
    return String(second - Math.floor(second / 60) * 60).padStart(2, "0");
  }, [second]);

  const minuteToView = useMemo(() => {
    return String(Math.floor(second / 60)).padStart(2, "0");
  }, [second]);

  return (
    <div className="app">
      <div className="timerVariation">
        <button onClick={handleWork} className="timerWork">
          Work
        </button>
        <button onClick={handleBigRest} className="timerBigRest">
          Big Rest
        </button>
        <button onClick={handleSmallRest} className="timerSmallRest">
          Small Rest
        </button>
      </div>
      <div className="timer">
        {minuteToView}:{secondToView}
      </div>
      <div className="timerProgress">
        <progress
          max={progressMax}
          value={progressMax - second}
          className="progress"
        ></progress>
      </div>
      <div className="addTime">
        <div onClick={() => handleAddTime(60 * 25)} className="addTwentyFive">
          +25
        </div>
        <div onClick={() => handleAddTime(60 * 15)} className="addTen">
          +10
        </div>
        <div onClick={() => handleAddTime(60 * 5)} className="addFive">
          +5
        </div>
        <div onClick={() => handleAddTime(60)} className="addOne">
          +1
        </div>
      </div>
      <div className="btns">
        {!isStarted && (
          <button onClick={handleStart} className="startTimer">
            Start
          </button>
        )}
        {isStarted && (
          <>
            <button onClick={handleStop} className="pauseTimer">
              Pause
            </button>
            <button onClick={handleReset} className="resetTimer">
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
