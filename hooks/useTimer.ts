
import { useState, useRef, useCallback, useEffect } from 'react';

const useTimer = (initialTime: number) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  }, [isRunning]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTime(initialTime);
  }, [stopTimer, initialTime]);
  
  useEffect(() => {
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [])

  return { time, isRunning, startTimer, stopTimer, resetTimer };
};

export default useTimer;
