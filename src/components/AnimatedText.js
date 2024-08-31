import React, { useState, useEffect } from 'react';
import '../css/AnimatedText.css';

const AnimatedTextComponent = () => {
  const texts = [
    "Welcome to StoneStream!",
    "Manage your inventory efficiently.",
    "Track sales and purchases seamlessly.",
    "Stay updated with notifications."
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setDisplayedText('');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex, texts]);

  return (
    <div className="typewriter">
      {displayedText}
    </div>
  );
};

export default AnimatedTextComponent;
