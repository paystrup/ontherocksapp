// inspiration https://chat.openai.com/chat
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'

export default function TypeWriterEffect({ words }) {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  // import copy translations from i18n
  const { t } = useTranslation();

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
        setCurrentWord("");
      }, 1000); // pause for 1 second before moving to the next word
    }
  }, [currentWord, wordIndex, words]);

  return (
    <div> 
        <h4 className="text-2xl font-light lg:px-16 lg:text-6xl lg:leading-normal">
            {t("typewriter.impress")} <span className="text-primaryYellow underline">{currentWord} {currentWord.length === words[wordIndex].length}</span> <br />
            {t("typewriter.bottomText")}
        </h4>
    </div>
  );
}