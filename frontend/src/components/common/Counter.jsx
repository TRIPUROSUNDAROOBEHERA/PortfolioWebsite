import React, { useState, useEffect } from 'react';

export default function Counter({ end = 100, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const target = Number(end) || 0;
    if (target === 0) return;

    const stepTime = Math.abs(Math.floor(duration / target)) || 20;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span className="font-extrabold tracking-tight">
      {prefix}{count}{suffix}
    </span>
  );
}