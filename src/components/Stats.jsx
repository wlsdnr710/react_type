import { useEffect, useState } from "react";
import "./Stats.css";

const Stats = ({ accuracy, isTyping, keyCount, wordCount }) => {
  const [lastSession, setLastSession] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      setLastSession((prev) => prev + time);
      setTime(0);
      setStartTime(new Date());
    } else {
      if(!time) {
        setStartTime(new Date());
      }
      const timer = setInterval(() => {
        setTime(Math.floor(new Date() - startTime));
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isTyping, time]);

  return (
    <p>
      <span className="stat">CPM: {Math.round(keyCount/((time+lastSession)/600000))/10}</span>
      <span className="stat">
        WPM: {Math.round(wordCount / ((time + lastSession) / 600000))/10}
      </span>
      <span className="stat">Accuracy: {accuracy}</span>
      <span className="stat">Timer : {time}/{lastSession}</span>
    </p>
  );
};

export default Stats;
