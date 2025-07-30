import { useState } from "react";
import Typing from "./components/Typing";
import "./App.css";
import Logo from "./assets/Logo.jsx";

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
    <>
      <div className="header">
        <Logo themeColor={colors[themeColor]} onClick={logoClickHandler} />
        <h2 style={{ color: colors[themeColor] }}>React Type</h2>
      </div>
      <Typing />
    </>
  );
}

export default App;
