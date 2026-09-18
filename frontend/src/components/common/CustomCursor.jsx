import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setTrailingPos({ x: e.clientX, y: e.clientY });
      }, 50);

      const target = e.target;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      />
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/60 pointer-events-none z-[9998] transition-transform duration-150 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
          isPointer ? 'scale-150 bg-purple-500/10 border-purple-600' : 'scale-100'
        }`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      />
    </>
  );
}