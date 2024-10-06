import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Import the LinkedIn icon from react-icons
import styles from "./Footer.module.css"; // Import the CSS module

const Footer1 = () => {
  return (
    <footer className={styles.footer}>
      {/* Left side: Logo, team name, and info */}
      <div className={styles.footerLeft}>
        <h2 className={styles.teamName}>KAIZEN</h2>
        <p className={styles.teamInfo}>
          Kaizen is a dynamic group of AI and tech innovators focused on
          continuous improvement. We work on cutting-edge projects, from
          advanced web development frameworks to real-time educational
          platforms, blending creativity with technology. Our mission is to
          solve real-world problems through collaborative efforts, pushing the
          boundaries of what's possible in AI and tech.
        </p>
      </div>

      {/* Right side: Team members */}
      <div className={styles.footerRight}>
        <h3 className={styles.footerTitle}>Team Members</h3>
        <ul className={styles.teamMembers}>
          <li>
            <a
              href="https://www.linkedin.com/in/rajas-bhosale-44773a258/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icon} /> Rajas Bhosale
            </a>
            <a
              href="mailto:rajasvbhosale@gmail.com"
              className={styles.emailLink}
            >
              rajas@kaizen.com
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/vishal-bokare-585381264/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icon} /> Vishal Bokare
            </a>
            <a href="mailto:vishal45@gmail.com" className={styles.emailLink}>
              vishal@kaizen.com
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kishan-chaudhary-63a137282/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icon} /> Kishan Chaudhary
            </a>
            <a
              href="mailto:kishanchaudharyooo9.com"
              className={styles.emailLink}
            >
              kishan@kaizen.com
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/darshan-biradar-5140b4264/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icon} /> Darshan Biradar
            </a>
            <a
              href="mailto:darshanbiradar78@gmail.com"
              className={styles.emailLink}
            >
              darshan@kaizen.com
            </a>
          </li>
        </ul>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>© 2024 KAI-ZEN. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer1;
