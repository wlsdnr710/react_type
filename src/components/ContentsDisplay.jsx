import { temporaryText } from "./temporaryText";
import "./ContentsDisplay.css";
import { isHangulChar } from "./translateHangul";
import { disassemble } from "es-hangul";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트.
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// Very far goal : Make backend/DB that lets people upload/select things to type.
const ContentsDisplay = ({ currentWord, currentLetter, typedWords }) => {
  let words = temporaryText.split(" ");
  let processedText = words.map((word, wordIndex) => {
    let wordClass = "word";
    if (currentWord === wordIndex) {
      wordClass += " currentWord";
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
              if (isHangulChar(letter)) {
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
