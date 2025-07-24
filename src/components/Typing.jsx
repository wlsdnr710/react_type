import { useEffect, useState } from "react";
import ContentsDisplay from "./ContentsDisplay";

const Typing = () => {
  const [keyPressed, setKeyPressed] = useState("");
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key.length);
      if (event.key.length > 1) {
        switch (event.key) {
          case "Escape":
            setKeyPressed("");
            console.log("Escape");
            break;
          case "Enter":
            console.log("Enter");
            setKeyPressed((prev) => prev + "\n");
            break;
          case "Backspace":
            setKeyPressed((prev) => prev.slice(0, -1));
            console.log("Backspace");
            break;
        }
        return;
      }
      setKeyPressed((prev) => prev + event.key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div>
      <h1>Typing Component</h1>
      <ContentsDisplay />
      <p>{keyPressed}</p>
    </div>
  );
};

export default Typing;
