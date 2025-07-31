import { getSampleText } from "./temporaryText";
import "./ContentsDisplay.css";
import { isHangulChar } from "./translateHangul";
import { disassemble } from "es-hangul";
import { useEffect } from "react";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트.
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// Very far goal : Make backend/DB that lets people upload/select things to type.

// Escape (지울때) 오타를 지우는지 여부 체크. 
const ContentsDisplay = ({
  currentSentence,
  currentWord,
  currentLetter,
  typedWords,
  handleFinishedSentence,
  handleTypo,
}) => {

  function isCorrect(displayedWord, typedWord, isHangul) {
    //한글 비교
    if (isHangul) {
      const typeDisassembled = disassemble(typedWord);
      const sampleDisassembled = disassemble(displayedWord);
      if (
        sampleDisassembled.substring(0, typeDisassembled.length) ==
        typeDisassembled
      ) {
        return true;
      } else {
        return false;
      }
      // 한글 외에 다른 문자들교비교
    } else if (displayedWord === typedWord) {
      return true;
    } else {
      return false;
    }
  }

  let words = getSampleText(currentSentence).split(" ");

  useEffect(() => {
    if (words && words[currentWord]) {
      const displayCurrentChar = words[currentWord][currentLetter - 1];
      const displayNextChar = words[currentWord][currentLetter];
      const typedCurrentChar = typedWords[currentWord][currentLetter - 1];
      if (isHangulChar(displayCurrentChar) && isHangulChar(typedCurrentChar)) {
        !isCorrect(
          displayCurrentChar + displayNextChar,
          typedCurrentChar,
          true
        ) && handleTypo();
      } else {
        !isCorrect(displayCurrentChar, typedCurrentChar, false) &&
          handleTypo();
      }
    }
  }, [currentLetter]);

  let processedText = words.map((word, wordIndex) => {
    let wordClass = "word";
    if (currentWord === wordIndex) {
      wordClass += " currentWord";
    }
    if (currentWord >= words.length) {
      handleFinishedSentence();
    }
    return (
      <>
        <span className={wordClass} key={wordIndex}>
          {word.split("").map((letter, letterIndex) => {
            let letterClass = "letter";
            if (
              wordIndex < currentWord ||
              (wordIndex == currentWord && letterIndex < currentLetter)
            ) {
              //한글 오타체크
              if (
                wordIndex == currentWord &&
                letterIndex == currentLetter - 1 && // 현재 입력중인 문자만 처리
                isHangulChar(letter) &&
                isHangulChar(typedWords[wordIndex][letterIndex])
              ) {
                letterClass += isCorrect(
                  letter + word[letterIndex + 1],
                  typedWords[wordIndex][letterIndex],
                  true
                )
                  ? " correct"
                  : " incorrect";
                // 한글 외에 다른 문자들교비교
              } else {
                letterClass += isCorrect(
                  letter,
                  typedWords[wordIndex][letterIndex],
                  false
                )
                  ? " correct"
                  : " incorrect";
              }
            }
            return (
              <span
                className={letterClass}
                key={String(wordIndex) + "/" + String(letterIndex)}
              >
                {letter}
              </span>
            );
          })}
        </span>
        <span className="space" key={"space" + wordIndex}>
          &nbsp;
        </span>
      </>
    );
  });

  return <div className="contentDisplay">{processedText}</div>;
};

export default ContentsDisplay;
