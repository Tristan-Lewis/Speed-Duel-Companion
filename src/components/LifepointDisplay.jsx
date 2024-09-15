import React, { useState, useEffect, useRef } from "react";

const LifepointDisplay = ({ lifepoints, animating }) => {
  const [displayedLifepoints, setDisplayedLifepoints] = useState(lifepoints);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (animating) {
      const endTime = Date.now() + 3000; // Animation duration: 3 seconds

      intervalRef.current = setInterval(() => {
        setDisplayedLifepoints(Math.floor(Math.random() * 10000)); // Random number between 0 and 9999

        if (Date.now() > endTime) {
          clearInterval(intervalRef.current);
          setDisplayedLifepoints(lifepoints); // Set final value
        }
      }, 50); // Update every 50ms for rapid changes

      return () => clearInterval(intervalRef.current);
    }
  }, [animating, lifepoints]);

  return (
    <div className="lifepoint-display">
      {String(displayedLifepoints).padStart(4, '0').split('').map((digit, index) => (
        <span key={index} className="digit">
          {digit}
        </span>
      ))}
    </div>
  );
};

export default LifepointDisplay;