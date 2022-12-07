// inspiration https://chat.openai.com/chat
import { useState, useEffect } from "react";

export default function TypeWriterEffect({ words }) {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  // use setTimeout to update currentWord one character at a time
  useEffect(() => {
    if (currentWord.length < words[wordIndex].length) {
      setTimeout(() => {
        setCurrentWord(prevWord => prevWord + words[wordIndex][prevWord.length]);
      }, 100); // delay of 100ms between each character
    } else {
      // move on to the next word after a brief pause
      setTimeout(() => {
        setWordIndex(prevIndex => (prevIndex + 1) % words.length);
        setCurrentWord('');
      }, 1000); // pause for 1 second before moving to the next word
    }
  }, [currentWord, wordIndex, words]);

  return (
    <div> 
        <h4 className="text-2xl font-light">
            Imponér <span className="text-primaryYellow underline">{currentWord} {currentWord.length === words[wordIndex].length}</span> <br />
            med økologiske, nemme og lækre cocktails. 
        </h4>
    </div>
  );
}