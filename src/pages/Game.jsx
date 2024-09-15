import { useState, useCallback } from "react";
import lifepointAudio from "../assets/audio/lifepoints.mp3";

const Game = () => {
  // Initial state values
  const initialP1Lifepoints = 4000;
  const initialP2Lifepoints = 4000;
  const initialP1TotalValue = null;
  const initialP2TotalValue = null;
  const initialOperation = "-";

  const [p1Lifepoints, setP1Lifepoints] = useState(initialP1Lifepoints);
  const [p2Lifepoints, setP2Lifepoints] = useState(initialP2Lifepoints);
  const [p1TotalValue, setP1TotalValue] = useState(initialP1TotalValue);
  const [p2TotalValue, setP2TotalValue] = useState(initialP2TotalValue);
  const [p1Operation, setP1Operation] = useState(initialOperation);
  const [p2Operation, setP2Operation] = useState(initialOperation);
  const [animatingP1, setAnimatingP1] = useState(false);
  const [animatingP2, setAnimatingP2] = useState(false);

  // Function to animate lifepoints with increments/decrements of 10
  const animateLifepoints = useCallback((player, finalValue) => {
    const duration = 1900; // Duration of the animation in milliseconds
    const stepSize = 10; // Value change per step

    const startValue = player === 1 ? p1Lifepoints : p2Lifepoints;
    const startTime = performance.now(); // Get the current time

    const updateLifepoints = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Calculate progress
      const totalSteps = Math.floor((finalValue - startValue) / stepSize);
      const currentStep = Math.round(totalSteps * progress);

      const currentLifepoints = startValue + currentStep * stepSize;

      if (player === 1) {
        setP1Lifepoints(currentLifepoints);
        if (progress < 1) {
          requestAnimationFrame(updateLifepoints); // Continue animating
        } else {
          setAnimatingP1(false);
        }
      } else {
        setP2Lifepoints(currentLifepoints);
        if (progress < 1) {
          requestAnimationFrame(updateLifepoints); // Continue animating
        } else {
          setAnimatingP2(false);
        }
      }
    };

    setAnimatingP1(player === 1);
    setAnimatingP2(player === 2);
    requestAnimationFrame(updateLifepoints); // Start animating
    new Audio(lifepointAudio).play();
  }, [p1Lifepoints, p2Lifepoints]);

  // Handle submit for player 1
  const handleSubmit = (player) => {
    const finalValue = player === 1 ? p1Lifepoints + (p1TotalValue || 0) : p2Lifepoints + (p2TotalValue || 0);

    if (player === 1) {
      setP1TotalValue(initialP1TotalValue); // Reset after submit
      animateLifepoints(1, finalValue);
    } else if (player === 2) {
      setP2TotalValue(initialP2TotalValue); // Reset after submit
      animateLifepoints(2, finalValue);
    }
  };

  // Handle cancel for player 1
  const handleCancel = (player) => {
    if (player === 1) {
      setP1TotalValue(initialP1TotalValue); // Reset to default value
    } else if (player === 2) {
      setP2TotalValue(initialP2TotalValue); // Reset to default value
    }
  };

  // Handle value change for both players
  const handleValueChange = (player, amount) => {
    const operation = player === 1 ? p1Operation : p2Operation;
    const newTotalValue = operation === "-" ? -amount : amount;
    if (player === 1) {
      setP1TotalValue(prevValue => (prevValue || 0) + newTotalValue);
    } else if (player === 2) {
      setP2TotalValue(prevValue => (prevValue || 0) + newTotalValue);
    }
  };

  // Click handlers for amount buttons
  const handleClick = (player, amount) => () => handleValueChange(player, amount);

  // Handle reset for all values
  const handleReset = () => {
    setP1Lifepoints(initialP1Lifepoints);
    setP2Lifepoints(initialP2Lifepoints);
    setP1TotalValue(initialP1TotalValue);
    setP2TotalValue(initialP2TotalValue);
    setP1Operation(initialOperation);
    setP2Operation(initialOperation);
  };

  return (
    <>
      <div className="player1-container">
        <p className={`p1-lifepoints ${animatingP1 ? "animate" : ""}`}>{p1Lifepoints}</p>
        <div className="p1-operation">
          <i
            className={`fa-solid fa-plus ${p1Operation === "+" ? "active" : ""}`}
            onClick={() => setP1Operation("+")}
          ></i>
          <i
            className={`fa-solid fa-minus ${p1Operation === "-" ? "active" : ""}`}
            onClick={() => setP1Operation("-")}
          ></i>
        </div>
        <div className="p1-operation-container">
          <p className="p1-pending-operation">{p1TotalValue}</p>
          <div className="p1-lifepoint-operations">
            <button className={`${p1Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(1, 1000)}>1000</button>
            <button className={`${p1Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(1, 500)}>500</button>
            <button className={`${p1Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(1, 100)}>100</button>
            <button className={`${p1Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(1, 50)}>50</button>
          </div>
          <div className="submit-container">
            <i className="fa-solid fa-check p1-submit-btn" onClick={() => handleSubmit(1)}></i>
            <i className="fa-solid fa-xmark p1-cancel-btn" onClick={() => handleCancel(1)}></i>
          </div>
        </div>
      </div>

      <div className="game-options">
        <i className="fa-solid fa-dice-six dice-btn"></i>
        <i className="fa-solid fa-arrows-rotate reset-btn" onClick={handleReset}></i>
        <i className="fa-solid fa-coins coin-btn"></i>
      </div>

      <div className="player2-container">
        <p className={`p2-lifepoints ${animatingP2 ? "animate" : ""}`}>{p2Lifepoints}</p>
        <div className="p2-operation-container">
          <p className="p2-pending-operation">{p2TotalValue}</p>
          <div className="p2-lifepoint-operations">
            <button className={`${p2Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(2, 1000)}>1000</button>
            <button className={`${p2Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(2, 500)}>500</button>
            <button className={`${p2Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(2, 100)}>100</button>
            <button className={`${p2Operation === "-" ? "subtract" : "add"}`} onClick={handleClick(2, 50)}>50</button>
          </div>
          <div className="controls">
            <div className="submit-container">
              <i className="fa-solid fa-check p2-submit-btn" onClick={() => handleSubmit(2)}></i>
              <i className="fa-solid fa-xmark p2-cancel-btn" onClick={() => handleCancel(2)}></i>
            </div>
            <div className="p2-operation">
              <i
                className={`fa-solid fa-plus ${p2Operation === "+" ? "active" : ""}`}
                onClick={() => setP2Operation("+")}
              ></i>
              <i
                className={`fa-solid fa-minus ${p2Operation === "-" ? "active" : ""}`}
                onClick={() => setP2Operation("-")}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
