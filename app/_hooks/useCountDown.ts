import { useEffect, useState } from "react";

const getRemainingSeconds = (target: string | null) => {
  if (!target) return 0;

  return Math.max(
    0,
    Math.ceil((new Date(target).getTime() - Date.now()) / 1000),
  );
};

export const useCountdown = (target: string | null) => {
  const [seconds, setSeconds] = useState(() => getRemainingSeconds(target));

  useEffect(() => {
    setSeconds(getRemainingSeconds(target));

    if (!target) return;

    const interval = setInterval(() => {
      const remaining = getRemainingSeconds(target);

      setSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return seconds;
};
