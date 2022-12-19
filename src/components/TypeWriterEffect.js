import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function TypeWriterEffect() {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  const { t } = useTranslation(); // import copy translations from i18n

  // works with lng support
  const words = [
    t("typewriter.girlfriend"),
    t("typewriter.dog"),
    t("typewriter.carpenter"),
    t("typewriter.postman"),
    t("typewriter.friend"),
    t("typewriter.grandpa"),
    t("typewriter.college"),
  ];

  const filteredWords = words.filter((word) => word !== undefined);
  // use setTimeout to update currentWord one character at a time
  useEffect(() => {
    if (currentWord.length < filteredWords[wordIndex].length) {
      setTimeout(() => {
        setCurrentWord(
          (prevWord) => prevWord + filteredWords[wordIndex][prevWord.length]
        );
      }, 100);
    } else {
      // move on to the next word after a brief pause 100ms
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % filteredWords.length);
        setCurrentWord("");
      }, 1000); // pause for 1 second before moving to the next word
    }
  }, [currentWord, wordIndex, filteredWords]); // listen for new word and rerender

  return (
    <div>
      <h4 className="text-2xl font-regular lg:px-16 lg:text-6xl lg:leading-normal">
        {t("typewriter.impress")}{" "}
        <span className="text-primaryYellow underline">
          {currentWord} {currentWord.length === filteredWords[wordIndex].length}
        </span>
        <br />
        {t("typewriter.bottomText")}
      </h4>
    </div>
  );
}
