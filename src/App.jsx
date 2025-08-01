import { useState } from "react";
import Typing from "./components/Typing";
import "./App.css";
import Logo from "./assets/Logo.jsx";
import Selection from "./components/Selection/Selection.jsx";

function App() {
  //TODO: Create module later that will change themeColor with these
  const [themeColor, setThemeColor] = useState(0);
  const colors = [
    "#3498db",
    "#2ecc71",
    "#e74c3c",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
  ];

  function logoClickHandler() {
    setThemeColor((prev) => (prev + 1) % 6);
  }

  return (
    <div style={{'--accent-color': colors[themeColor]}}>
      <div className="header">
        <Logo themeColor={colors[themeColor]} onClick={logoClickHandler} />
        <h2>React Type</h2>
        {/* <Selection list={["한글","영어"]} /> */}
      </div>
      <Typing />
    </div>
  );
}

export default App;
