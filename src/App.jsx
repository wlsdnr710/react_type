import { useState } from "react";
import Typing from "./components/Typing";
import "./App.css";
import Logo from "./assets/Logo.jsx";

function App() {
  //TODO: Create module later that will change themeColor with these
  const [themeColor, setThemeColor] = useState("#000000");
  // const colors = [
  //   "#3498db",
  //   "#2ecc71",
  //   "#e74c3c",
  //   "#f39c12",
  //   "#9b59b6",
  //   "#1abc9c",
  // ];

  return (
    <>
      <div className="header">
        <Logo themeColor={themeColor} />
        <h2>React Type</h2>
      </div>
      <Typing />
      <textarea name="" id=""></textarea>
    </>
  );
}

export default App;
