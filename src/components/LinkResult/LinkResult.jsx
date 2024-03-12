import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./LinkResult.module.scss";

const LinkResult = ({ inputValue }) => {
  const [shortenedLink, setShortenedLink] = useState("LINK");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

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
          setShortenedLink(result);
        } else {
          setShortenedLink("Failed to shorten URL");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (inputValue) {
      shortenUrl();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={styles.resultContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{shortenedLink}</p>
          <CopyToClipboard text={shortenedLink} onCopy={() => setCopied(true)}>
            <button className={copied ? styles.copied : ""}>
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </>
      )}
    </div>
  );
};

export default LinkResult;
