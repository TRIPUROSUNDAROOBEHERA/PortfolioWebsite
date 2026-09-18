import React, { useState, useEffect } from 'react';

export default function TypingEffect({
  words = ['MCA Graduate', 'Software Developer', 'Full Stack Engineer'],
  speed = 120,
  eraseSpeed = 60,
  delay = 1800,
  className = ''
}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIndex % words.length] || '';

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && text === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    } else {
      timer = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, isDeleting ? eraseSpeed : speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, eraseSpeed, delay]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="w-0.5 h-4 bg-blue-600 ml-1 animate-pulse" />
    </span>
  );
}