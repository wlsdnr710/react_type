import { getSampleText } from "./temporaryText";
import "./ContentsDisplay.css";
import { isHangulChar } from "./translateHangul";
import { disassemble } from "es-hangul";
import { useEffect, useState } from "react";

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
  handleDeleteTypo,
}) => {
  const [typoIndex, setTypoIndex] = useState([]);

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
  const currentSentenceString = getSampleText(currentSentence)
  let words = currentSentenceString.split(" ");

  useEffect(() => {
    //문장이 완전히 지워진 경우 (초기화)
    if (!currentWord && !currentLetter) {
      setTypoIndex([]);
    }
    if (words && words[currentWord]) {
      // 오타를 지워 나간 경우
      if (
        typoIndex.length &&
        typoIndex[typoIndex.length - 1][0] == currentWord &&
        typoIndex[typoIndex.length - 1][1] >= currentLetter
      ) {
        setTypoIndex((prev) => prev.slice(0, -1));
        handleDeleteTypo();
      }
      // 오타가 발생한 경우
      else {
        const displayCurrentChar = words[currentWord][currentLetter - 1];
        const displayNextChar = words[currentWord][currentLetter];
        const typedCurrentChar = typedWords[currentWord][currentLetter - 1];
        //한글 오타
        if (
          isHangulChar(displayCurrentChar) &&
          isHangulChar(typedCurrentChar)
        ) {
          !isCorrect(
            displayCurrentChar + displayNextChar,
            typedCurrentChar,
            true
          ) &&
            handleTypo() &&
            setTypoIndex((prev) => [...prev, [currentWord, currentLetter - 1]]);
        }
        //영어 or 기타 문자 오타
        else {
          !isCorrect(displayCurrentChar, typedCurrentChar, false) &&
            handleTypo() &&
            setTypoIndex((prev) => [...prev, [currentWord, currentLetter - 1]]);
        }
      }
    }
    //현재 문장 끝남. 초기화
    if (currentWord >= words.length) {
      handleFinishedSentence();
      setTypoIndex([]);
    }
  }, [currentLetter, currentWord]);

  //컨텐츠 컴포넌트 생성
  let processedText = words.map((word, wordIndex) => {
    let wordClass = "word";
    // 현재 문장 강조 표시용 클래스
    if (currentWord === wordIndex) {
      wordClass += " currentWord";
    }
    return (
      <>
        <span className={wordClass} key={wordIndex}>
          {word.split("").map((letter, letterIndex) => {
            let letterClass = "letter";
            // 타이핑한 글자들 오타여부 확인
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

  return (
    <div className="contentDisplay">
      <progress value={typedWords.join(" ").length} max={currentSentenceString.length}/><br></br>
      {processedText}
    </div>
  );
};

export default ContentsDisplay;
