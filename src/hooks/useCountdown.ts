import { useEffect, useState } from "react";
import { zonedDateTimeToUtcMs } from "../utils/datetime";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function compute(targetMs: number, now: number): CountdownValue {
  const diff = Math.max(0, targetMs - now);
  const secondsTotal = Math.floor(diff / 1000);
  return {
    days: Math.floor(secondsTotal / 86400),
    hours: Math.floor((secondsTotal % 86400) / 3600),
    minutes: Math.floor((secondsTotal % 3600) / 60),
    seconds: secondsTotal % 60,
    isComplete: diff === 0,
  };
}

export function useCountdown(dateTime: string, timeZone: string): CountdownValue {
  const targetMs = zonedDateTimeToUtcMs(dateTime, timeZone);
  const [value, setValue] = useState(() => compute(targetMs, Date.now()));

  useEffect(() => {
    let id = 0;
    const tick = () => {
      const next = compute(targetMs, Date.now());
      setValue(next);
      if (next.isComplete && id) {
        window.clearInterval(id);
      }
    };
    tick();
    if (!compute(targetMs, Date.now()).isComplete) {
      id = window.setInterval(tick, 1000);
    }
    return () => window.clearInterval(id);
  }, [targetMs]);

  return value;
}
