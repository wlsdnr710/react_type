import { useEffect, useState } from "react";
import ContentsDisplay from "./ContentsDisplay";

// 유저가 타이핑 한 내용을 처리하는 컴포넌트 (개발에 따라 컴포넌트화 하지 않고 아예 안보이게 할 수도 있음.)
// TODO : 한글 처리 방법 생각하기 (Toss 한글 라이브러리 찾아보고 활용방법 생각하기)
// TODO : 더 나은 저장 구조 생각해보기
// TODO : Enter & Space 처리 방법 생각하기
const Typing = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [wordCount, setWordCount] = useState(0);
  // const [hangulBuffer, setHangulBuffer] = useState([]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length > 1) {
        switch (event.key) {
          case "Escape":
            setKeyPressed("");
            setWordCount(0);
            break;
          case "Enter":
            setKeyPressed((prev) => prev + "\n");
            break;
          case "Backspace":
            if (keyPressed.slice(-1) === " ") {
              setWordCount((prev) => prev - 1);
            }
            setKeyPressed((prev) => prev.slice(0, -1));
            break;
          default:
        }
        return;
      }
      if (event.key == " ") {
        setWordCount((prev) => prev + 1);
      }
      setKeyPressed((prev) => prev + event.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressed]);

  console.log(keyPressed)
  // console.log(wordCount);
  return (
    <div>
      <ContentsDisplay currentWord={wordCount} />
      <p>{keyPressed}</p>
    </div>
  );
};

export default Typing;
