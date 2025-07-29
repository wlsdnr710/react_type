import { useEffect, useState } from "react";
import ContentsDisplay from "./ContentsDisplay";
import translateHangul from "./translateHangul";

// 유저가 타이핑 한 내용을 처리하는 컴포넌트 (개발에 따라 컴포넌트화 하지 않고 아예 안보이게 할 수도 있음.)
// TODO : 한글 처리 방법 생각하기 (Toss 한글 라이브러리 찾아보고 활용방법 생각하기)
// TODO : 더 나은 저장 구조 생각해보기
// TODO : Enter & Space 처리 방법 생각하기
const Typing = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isHangul, setIsHangul] = useState(false);
  // const [hangulBuffer, setHangulBuffer] = useState([]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length > 1) {
        switch (event.key) {
          case "Escape":
            setKeyPressed("");
            setLetterCount(0);
            setWordCount(0);
            break;
          case "Enter":
            // TODO: Multiple sentence -> skip to next sentence.
            setKeyPressed((prev) => prev + "\n");
            break;
          case "Backspace":
            if (keyPressed.slice(-1) === " ") {
              setWordCount((prev) => prev - 1);
              setLetterCount(keyPressed.split(" ")[wordCount - 1].length);
            }
            if (letterCount) {
              setLetterCount((prev) => prev - 1);
            }
            setKeyPressed((prev) => prev.slice(0, -1));
            break;
          case "Alt":
            if (event.code == "AltLeft") {
              break;
            }
          // eslint-disable-next-line no-fallthrough
          case "HangulMode":
            console.log("한/영");
            setIsHangul((prev) => !prev);
            break;
          default:
        }
        return;
      }
      setLetterCount((prev) => prev + 1);
      if (event.key == " ") {
        setWordCount((prev) => prev + 1);
        setLetterCount(0);
        setKeyPressed((prev) => prev + event.key);
      } else if (isHangul) {  // 한글 입력중
        //TODO : 한글 조합 기능 넣기.
        setKeyPressed(
          (prev) => prev + translateHangul(event.key, event.shiftKey)
        );
      } else {  // 영어 입력중
        setKeyPressed((prev) => prev + event.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressed, isHangul, letterCount, wordCount]);

  // console.log(wordCount, letterCount);
  // console.log(keyPressed);
  const typedWords = keyPressed.split(" ");

  return (
    <div>
      {isHangul && <p>한글입력중</p>}
      <ContentsDisplay
        currentWord={wordCount}
        currentLetter={letterCount}
        typedWords={typedWords}
      />
      <p>{keyPressed}</p>
    </div>
  );
};

export default Typing;
