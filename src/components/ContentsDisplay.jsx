import { temporaryText } from "./temporaryText";
import "./ContentsDisplay.css";

// 타이핑을 할 내용 (문장, 단어들등) 을 보여주는 컴포넌트.
// TODO: 문장 여러개 추가하기 (temporaryText 대체)
// TODO: 입력된 문자(Typing)랑 비교해서 오타 표시기능 구현하기.

// Very far goal : Make backend/DB that lets people upload/select things to type.
const ContentsDisplay = ({ currentWord }) => {
  let words = temporaryText.split(" ");
  let processedText = words.map((word, index) => {
    let wordClass = "word";
    if (currentWord === index) {
      wordClass += " current";
    }
    return (
      <>
        <span className={wordClass}>
          {word.split("").map((letter) => (
            <span className="letter">{letter}</span>
          ))}
        </span>
        <span className="space">&nbsp;</span>
      </>
    );
  });

  return <div className="contentDisplay">{processedText}</div>;
};

export default ContentsDisplay;
