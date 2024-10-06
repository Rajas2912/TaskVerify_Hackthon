// src/Upload_Ass.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Upload2Cards.module.css"; // Import the CSS Module
import tcr_img from "./Assests/teach.jpg";
import std_img from "./Assests/studs.png";

export const Upload2Cards = () => {
  return (
    <div className={styles.cardContainer}>
      {/* First Card */}
      <div className={styles.card}>
        <div className={styles.cardBody}></div>
        <div className={styles.image}>
          <img src={tcr_img} alt="Assignment" />
          <div className={styles.title}>Teacher Dashboard</div>
        </div>
        <div className={styles.uploadButton}>
          <Link to="/teacherdashboard">Login</Link>{" "}
          {/* Redirect to Teacher Dashboard */}
        </div>
      </div>

      {/* Second Card */}
      <div className={styles.card}>
        <div className={styles.cardBody}></div>
        <div className={styles.image}>
          <img src={std_img} alt="AI Chatbot" />
          <div className={styles.title}>Student Dashboard</div>
        </div>
        <div className={styles.uploadButton}>
          <Link to="/studentdash">Login</Link>{" "}
          {/* Redirect to Student Dashboard */}
        </div>
      </div>
    </div>
  );
};
