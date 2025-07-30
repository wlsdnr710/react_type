import { useEffect, useState } from "react";
import ContentsDisplay from "./ContentsDisplay";
import "./Typing.css";
import { translateHangul, isHangulChar } from "./translateHangul";
import { assemble, removeLastCharacter } from "es-hangul";
import Stats from "./Stats";

// 유저가 타이핑 한 내용을 처리하는 컴포넌트 (개발에 따라 컴포넌트화 하지 않고 아예 안보이게 할 수도 있음.)
// TODO : 한글 처리 방법 생각하기 (Toss 한글 라이브러리 찾아보고 활용방법 생각하기)
// TODO : 더 나은 저장 구조 생각해보기
// TODO : Enter & Space 처리 방법 생각하기
const Typing = () => {
  const [keyPressed, setKeyPressed] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [cumulativeWordCount, setCumulativeWordCount] = useState(0);
  const [cumulativeKeyCount, setCumulativeKeyCount] = useState(0);
  const [isHangul, setIsHangul] = useState(false);
  const [hangulDelete, setHangulDelete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(
    Math.floor(Math.random() * 20)
  );
  // const [hangulBuffer, setHangulBuffer] = useState([]);

  function handleFinishedSentence() {
    setCurrentSentence(Math.floor(Math.random() * 20));
    resetTyping();
  }

  function resetTyping() {
    setKeyPressed("");
    setLetterCount(0);
    setWordCount(0);
    setIsTyping(false);
  }
  /**
   * 키보드 인풋 처리
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      // 특수키
      if (event.key.length > 1) {
        switch (event.key) {
          //ESC 키 - 입력하던 문장 초기화
          case "Escape":
            resetTyping();
            // Reset Everything (cumulative as well )
            setCumulativeKeyCount(0);
            setCumulativeWordCount(0);
            break;
          //Enter 키 - 나중에 기능 추가 (다음 문장으로) (TODO)
          case "Enter":
            setCurrentSentence((prev) => (prev + 1) % 20);
            resetTyping();
            break;
          //Backspace 키 - 이전 문자 지우기
          case "Backspace":
            // 마지막 문자 or Space 지울 경우 타이핑 상태 false로 전환
            if (
              (!wordCount && letterCount == 1) ||
              (!letterCount && wordCount == 1)
            ) {
              setIsTyping(false);
            }
            // 스페이스 지울경우 (현재 단어의 길이 -> 이전 단어 길이로 초기화)
            if (keyPressed.slice(-1) === " ") {
              setWordCount((prev) => prev - 1);
              setCumulativeWordCount((prev) => prev - 1);
              setLetterCount(keyPressed.split(" ")[wordCount - 1].length);
              setKeyPressed((prev) => prev.slice(0, -1));
              if (hangulDelete) {
                setHangulDelete(false);
              }
            }
            // 한글의 현재 문자를 지울경우 (자모음 하나씩 삭제)
            else if (hangulDelete) {
              const lengthReduced =
                keyPressed.length == removeLastCharacter(keyPressed).length;
              setKeyPressed((prev) => removeLastCharacter(prev));
              if (!lengthReduced) {
                setHangulDelete(false);
                setLetterCount((prev) => prev - 1);
              }
            }
            // 한 글자 한번에 지우기
            else {
              if (letterCount) {
                setKeyPressed((prev) => prev.slice(0, -1));
                setLetterCount((prev) => prev - 1);
              }
            }
            break;

          // 한/영 키
          case "Alt":
            if (event.code == "AltLeft") {
              //왼쪽 Alt는 아무 기능 아니므로 무시
              break;
            }
          // 한/영 - 한글/영어 입력모드 전환
          // eslint-disable-next-line no-fallthrough
          case "HangulMode":
            setIsHangul((prev) => !prev);
            break;
          default:
        }
        return;
      }
      // 스페이스 바
      else if (event.key == " ") {
        !isTyping && setIsTyping(true);
        setWordCount((prev) => prev + 1);
        setCumulativeKeyCount((prev) => prev + 1);
        setCumulativeWordCount((prev) => prev + 1);
        setLetterCount(0);
        setKeyPressed((prev) => prev + event.key);
      }
      // 한글 입력 처리
      else if (isHangul) {
        !isTyping && setIsTyping(true);
        setHangulDelete(true);
        const currentHangulInput = translateHangul(event.key, event.shiftKey);
        const lastChar = keyPressed[keyPressed.length - 1];
        if (
          isHangulChar(lastChar) && //이전 문자가 한글 (특문제외)
          isHangulChar(currentHangulInput) //현재 문자가 한글
        ) {
          const assembledWord = assemble([lastChar, currentHangulInput]);
          setKeyPressed((prev) => prev.slice(0, -1) + assembledWord);
          setLetterCount((prev) => prev + assembledWord.length - 1);
        } else {
          setKeyPressed((prev) => prev + currentHangulInput);
          setLetterCount((prev) => prev + 1);
        }
        setCumulativeKeyCount((prev) => prev + 1);
      }
      // 영어 입력 처리
      else {
        !isTyping && setIsTyping(true);
        setKeyPressed((prev) => prev + event.key);
        setCumulativeKeyCount((prev) => prev + 1);
        setLetterCount((prev) => prev + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyPressed, isHangul, letterCount, wordCount, hangulDelete, isTyping]);

  // console.log(wordCount, letterCount);
  // console.log(keyPressed);
  const typedWords = keyPressed.split(" ");

  return (
    <div>
      {isHangul && <p className="language">한글입력중</p>}
      <Stats
        accuracy={100}
        isTyping={isTyping}
        keyCount={cumulativeKeyCount}
        wordCount={cumulativeWordCount}
      />
      <ContentsDisplay
        currentSentence={currentSentence}
        currentWord={wordCount}
        currentLetter={letterCount}
        typedWords={typedWords}
        handleFinishedSentence={handleFinishedSentence}
      />
      <p className="typed">{keyPressed}</p>
    </div>
  );
};

export default Typing;
