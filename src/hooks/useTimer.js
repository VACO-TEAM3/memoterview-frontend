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
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return { time: { hour, min }, setIsActive };
}
