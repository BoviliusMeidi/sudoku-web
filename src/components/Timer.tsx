"use client";
import { useEffect, useRef, useState } from "react";

export default function Timer({
  isRunning,
  resetKey = 0,
  onFinish,
}: {
  isRunning: boolean;
  resetKey?: number;
  onFinish?: (t: number) => void;
}) {
  const [time, setTime] = useState(0);
  const wasRunningRef = useRef<boolean>(false);

  useEffect(() => {
    setTime(0);
    wasRunningRef.current = false;
  }, [resetKey]);

  useEffect(() => {
    let id: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      id = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else if (wasRunningRef.current) {
      onFinish?.(time);
    }

    wasRunningRef.current = isRunning;

    return () => {
      if (id) clearInterval(id);
    };
  }, [isRunning, time, onFinish]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-lg font-bold text-center">
      ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
