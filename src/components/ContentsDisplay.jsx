import { getSampleText } from "./temporaryText";
import "./ContentsDisplay.css";
import { isHangulChar } from "./translateHangul";
import { disassemble } from "es-hangul";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트.
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// TODO: 오타 표시 방법 생각해보기
// Very far goal : Make backend/DB that lets people upload/select things to type.
const ContentsDisplay = ({
  currentSentence,
  currentWord,
  currentLetter,
  typedWords,
  handleFinishedSentence,
}) => {
  let words = getSampleText(currentSentence).split(" ");
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
              //한글 비교
              if (
                wordIndex == currentWord &&
                letterIndex == currentLetter - 1 && // 현재 입력중인 문자만 처리
                isHangulChar(letter) &&
                isHangulChar(typedWords[wordIndex][letterIndex])
              ) {
                const typeDisassembled = disassemble(
                  typedWords[wordIndex][letterIndex]
                );
                const sampleDisassembled = disassemble(
                  letter + word[letterIndex + 1]
                );
                if (
                  sampleDisassembled.substring(0, typeDisassembled.length) ==
                  typeDisassembled
                ) {
                  letterClass += " correct";
                } else {
                  letterClass += " incorrect";
                }
                // 한글 외에 다른 문자들교비교
              } else if (letter === typedWords[wordIndex][letterIndex]) {
                letterClass += " correct";
              } else {
                letterClass += " incorrect";
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
