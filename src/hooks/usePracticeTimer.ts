"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimerPreset = 30 | 60 | 120 | "custom";

export function usePracticeTimer(initialSeconds = 60) {
  const [duration, setDuration] = useState(initialSeconds);
  const [remaining, setRemaining] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearTimer();
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return clearTimer;
  }, [running, clearTimer]);

  const start = useCallback(() => {
    setRemaining((r) => (r === 0 ? duration : r));
    setRunning(true);
  }, [duration]);

  const pause = useCallback(() => setRunning(false), []);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(duration);
  }, [duration]);

  const setDurationAndReset = useCallback((seconds: number) => {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(false);
  }, []);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  return {
    duration,
    remaining,
    running,
    start,
    pause,
    reset,
    setDurationAndReset,
    formatTime,
    isFinished: remaining === 0 && !running,
  };
}
