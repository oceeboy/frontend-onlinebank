import React, { useState, useEffect } from "react";

type TypewriterProps = {
  text: string; // Full text to display
  typingSpeed?: number; // Base speed for typing (milliseconds per character)
  punctuationPause?: number; // Longer pause after punctuation
  loopDelay?: number; // Delay before restarting the typing loop (milliseconds)
};

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeed = 50,
  punctuationPause = 300,
  loopDelay = 60000, // Default: 1 minute (60000 milliseconds)
}) => {
  const [displayedText, setDisplayedText] = useState<string>(""); // Text being displayed
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Current character index

  useEffect(() => {
    if (currentIndex < text.length) {
      const currentChar = text[currentIndex];
      const isPunctuation = [".", ",", "!", "?"].includes(currentChar);

      // Set a timeout to type the next character
      const timeout = setTimeout(
        () => {
          setDisplayedText((prev) => prev + currentChar);
          setCurrentIndex((prev) => prev + 1);
        },
        isPunctuation ? punctuationPause : typingSpeed
      );

      return () => clearTimeout(timeout); // Cleanup timeout
    } else {
      // If the text is fully typed, wait for the loop delay and restart
      const restartTimeout = setTimeout(() => {
        setDisplayedText(""); // Reset displayed text
        setCurrentIndex(0); // Reset index to start over
      }, loopDelay);

      return () => clearTimeout(restartTimeout); // Cleanup restart timeout
    }
  }, [currentIndex, text, typingSpeed, punctuationPause, loopDelay]);

  return (
    <span>
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};

export default Typewriter;
