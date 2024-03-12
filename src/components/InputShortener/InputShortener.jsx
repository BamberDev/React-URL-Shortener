import { useState } from "react";
import styles from "./InputShortener.module.scss";

function InputShortener({ setInputValue }) {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  };

  return (
    <div className={styles.inputContainer}>
      <h1>
        URL <span>Shortener</span>
        <div>
          <input
            type="text"
            placeholder="Paste a link"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={handleClick}>SHORTEN</button>
        </div>
      </h1>
    </div>
  );
}

export default InputShortener;
