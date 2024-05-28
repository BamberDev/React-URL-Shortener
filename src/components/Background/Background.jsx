import useWindowWidth from "../UseWindowWidth/UseWindowWidth";
import styles from "./Background.module.scss";

function Background() {
  const windowWidth = useWindowWidth();

  if (windowWidth < 768) {
    return null;
  }

  return (
    <div>
      <ul className={styles.background}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Background;
