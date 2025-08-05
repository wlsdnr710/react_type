import { useEffect, useState } from "react";
import "./Stats.css";

const Stats = ({ isTyping, keyCount, wordCount, typoCount, sentence }) => {
  const [lastSession, setLastSession] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [time, setTime] = useState(0);

  useEffect(() => {
    // not typing - pause timer
    // update startTime to check starting time (현재 시간과 시작시간의 차로 계산)
    // Pause 된 경우 이전 세션 duration 과 합산해서 계산하기 위해 계산.
    if (!isTyping) {
      setLastSession((prev) => prev + time);
      // ESC눌러서 초기화 된 경우.
      if (!wordCount && !keyCount) {
        setLastSession(0);
      }
      setTime(0);
      setStartTime(new Date());
    }
    // 타이핑 도중 : 지속 시간 업데이트.
    else {
      // ESC눌러서 초기화 된 경우.
      if (!wordCount && !keyCount) {
        setLastSession(0);
      }
      if (!time) {
        setStartTime(new Date());
      }
      const timer = setInterval(() => {
        setTime(Math.floor(new Date() - startTime));
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isTyping, time, keyCount]);

  return (
    <p>
      <span className="stat">
        CPM:{" "}
        {keyCount &&
          Math.round(keyCount / ((time + lastSession) / 600000)) / 10}
      </span>
      <span className="stat">
        WPM:{" "}
        {wordCount &&
          Math.round(wordCount / ((time + lastSession) / 600000)) / 10}
      </span>
      <span className="stat">
        Accuracy:{" "}
        {`${
          keyCount
            ? (
                Math.round(((keyCount - typoCount) / keyCount) * 10000) / 100
              ).toFixed(1)
            : "100.0"
        }%`}
      </span>
      <span className="stat">
        Timer : {((time + lastSession) / 1000).toFixed(1)} sec
      </span>
      <span className="stat">Sentence : {`${sentence}/10`}</span>
    </p>
  );
};

export default Stats;
