import { temporaryText } from "./temporaryText";
import "./ContentsDisplay.css";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트.
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// TODO: 입력된 문자(Typing)랑 비교해서 오타 표시기능 구현하기.

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
              if (letter === typedWords[wordIndex][letterIndex]) {
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
