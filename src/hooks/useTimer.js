import { useState, useRef, useCallback } from 'react';

export const useTimer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef(null);
    const startTimeRef = useRef(0);

    const startTimer = useCallback(() => {
        setIsRunning(true);
        startTimeRef.current = Date.now();
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTimeRef.current);
        }, 10);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    }, []);

    const resetTimer = useCallback(() => {
        stopTimer();
        setElapsedTime(0);
    }, [stopTimer]);

    return {
        isRunning,
        elapsedTime,
        startTimer,
        stopTimer,
        resetTimer
    };
};
