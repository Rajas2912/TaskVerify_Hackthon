import styles from "./FrontBanner.module.css"; // Import the module.css
import clg_img from "./Assests/studsss.png"; // Make sure the image path is correct

function FrontBanner() {
  return (
    <div className={styles.fbMain}>
      <div className={styles.fbText}>
        <div className={styles.fb1}>Welcome to TaskVerify</div>
        <div className={styles.fb2}>
          Automated, Accurate, and Instant Assignment Analysis.
        </div>
      </div>
      <div className={styles.fbImage}>
        <img src={clg_img} alt="College" />
      </div>
    </div>
  );
}

export default FrontBanner;
