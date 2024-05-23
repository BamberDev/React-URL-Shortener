import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./LinkResult.module.scss";

const LinkResult = ({ inputValue }) => {
  const [shortenedLinks, setShortenedLinks] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const shortenUrl = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(
            inputValue
          )}`
        );

        if (response.ok) {
          const result = await response.text();
          setShortenedLinks((prevLinks) => [
            ...prevLinks,
            { original: inputValue, shortened: result },
          ]);
          setError("");
        } else {
          throw new Error("Failed to shorten URL");
        }
      } catch (error) {
        setError("Failed to shorten URL. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (inputValue && shortenedLinks.length < 10) {
      shortenUrl();
    } else if (inputValue && shortenedLinks.length >= 10) {
      setError("You can shorten a maximum of 10 links.");
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [copiedIndex]);

  const handleClearLinks = () => {
    setShortenedLinks([]);
    setError("");
  };

  return (
    <div className={styles.container}>
      {loading && <p className={styles.loader}>Loading...</p>}
      <div className={styles.resultContainer}>
        {error && <p className={styles.error}>{error}</p>}
        {shortenedLinks.map((link, index) => (
          <div key={index} className={styles.linkContainer}>
            <div className={styles.links}>
              <p>
                {index + 1}. {link.shortened}
              </p>
              <p className={styles.originalLink}>
                {link.original.length > 25
                  ? `${link.original.slice(0, 25)}...`
                  : link.original}
              </p>
            </div>
            <CopyToClipboard
              text={link.shortened}
              onCopy={() => setCopiedIndex(index)}
            >
              <button
                className={
                  copiedIndex === index ? styles.copied : styles.copyButton
                }
                aria-label="Copy URL button"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
      {shortenedLinks.length > 0 && (
        <button className={styles.clearButton} onClick={handleClearLinks}>
          CLEAR
        </button>
      )}
    </div>
  );
};

export default LinkResult;

LinkResult.propTypes = {
  inputValue: PropTypes.string.isRequired,
};
