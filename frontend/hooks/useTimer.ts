import { useState, useEffect } from "react";

const useTimer = (time: number) => {
  const [remainingTime, setRemainingTime] = useState<number>(time);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const startTimer = (time: number) => {
    setRemainingTime(time);
    setIsTimerActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, remainingTime]);

  return {
    startTimer,
    isTimerActive,
    remainingTime,
  };
};

export default useTimer;
