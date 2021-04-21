import { useEffect, useState } from "react";

import { formatTimeForTimer } from "../utils/date";

export default function useTimer(initialState = 0) {
  const [time, setTime] = useState(initialState);
  const [isActive, setIsActive] = useState(false);

  const { hour, min } = formatTimeForTimer(time); 

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 60000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  function handleStart() {
    setIsActive(true);
  }

  function handleStop() {
    setIsActive(false);
  }

  return { time: { hour, min }, handleStart, handleStop };
}
