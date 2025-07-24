import { useEffect, useState } from "react";
import ContentsDisplay from "./ContentsDisplay";
import { assemble, standardizePronunciation } from "es-hangul";

// 유저가 타이핑 한 내용을 처리하는 컴포넌트 (개발에 따라 컴포넌트화 하지 않고 아예 안보이게 할 수도 있음.)
// TODO : 한글 처리 방법 생각하기 (Toss 한글 라이브러리 찾아보고 활용방법 생각하기)
// TODO : 더 나은 저장 구조 생각해보기
// TODO : Enter & Space 처리 방법 생각하기
const Typing = () => {
  const [keyPressed, setKeyPressed] = useState("");
	const [hangulBuffer, setHangulBuffer] = useState([]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length > 1) {
        switch (event.key) {
          case "Escape":
            setKeyPressed("");
            break;
          case "Enter":
            setKeyPressed((prev) => prev + "\n");
            break;
          case "Backspace":
            setKeyPressed((prev) => prev.slice(0, -1));
            break;
          default:
        }
        return;
      }
			console.log(event.key + ":" );
			console.log(event)
      setKeyPressed((prev) => prev + event.key);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

console.log(standardizePronunciation('둘이서'));
console.log(standardizePronunciation('똘똘이'));
console.log(standardizePronunciation('롤이'));
console.log(standardizePronunciation('샘물이'));
console.log(standardizePronunciation('다달이'));

  // console.log(keyPressed);
	// console.log(assemble(["ㄱ","ㅣ"]))

  return (
    <div>
      <ContentsDisplay />
      <p>{keyPressed}</p>
    </div>
  );
};

export default Typing;
