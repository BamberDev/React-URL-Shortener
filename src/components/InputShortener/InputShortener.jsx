import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./InputShortener.module.scss";

function InputShortener({ setInputValue }) {
  const [value, setValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const isValidUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleClick = () => {
    if (isValidUrl(value)) {
      setInputValue(value);
      setValue("");
      setShowAlert(false);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className={styles.inputContainer}>
      {showAlert && (
        <div className={styles.alert}>Please enter a valid URL.</div>
      )}
      <h1 className={styles.title}>
        URL <span>Shortener</span>
      </h1>
      <div>
        <input
          type="text"
          placeholder="Paste a link"
          value={value}
          onKeyDown={handleEnterPress}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick} className={styles.shortenButton}>
          SHORTEN
        </button>
      </div>
    </div>
  );
}

export default InputShortener;

InputShortener.propTypes = {
  setInputValue: PropTypes.func.isRequired,
};
