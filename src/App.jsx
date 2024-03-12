import { useState } from "react";
import Background from "./components/Background/Background";
import InputShortener from "./components/InputShortener/InputShortener";
import LinkResult from "./components/LinkResult/LinkResult";
import "./styles/globals.css";
function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />
      <Background />
      <LinkResult inputValue={inputValue} />
    </div>
  );
}

export default App;
