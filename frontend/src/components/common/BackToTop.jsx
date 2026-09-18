import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-[#1E6BFF] to-[#9333EA] text-white shadow-lg shadow-purple-500/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
    >
      <i className="fa-solid fa-arrow-up text-sm"></i>
    </button>
  );
}