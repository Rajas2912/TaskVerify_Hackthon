// src/Upload_Ass.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import styles from "./Upload_Ass.module.css"; // Import the CSS Module
import ass_img from "./Assests/teach.jpg";
import ldr_img from "./Assests/ldr2.png";
import bot_img from "./Assests/bot.jpg";

export const Create_upload = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className={styles.cardContainer}>
      {/* First Card */}
      <div className={styles.card}>
        <div className={styles.cardBody}></div>
        <div className={styles.image}>
          <img src={ass_img} alt="Assignment" />
          <div className={styles.title}>Create Assignments</div>
          <div className={styles.desc}>
            Create and Assign New Assignments for students to compete
          </div>
        </div>
        <div className={styles.uploadButton}>
          <button
            className={styles.meow}
            onClick={() => navigate("/TeacherCreate")}
          >
            Create
          </button>
        </div>
      </div>

      {/* Second Card */}
      <div className={styles.card}>
        <div className={styles.cardBody}></div>
        <div className={styles.image}>
          <img src={bot_img} alt="AI Chatbot" />
          <div className={styles.title}>AI Chatbot</div>
          <div className={styles.desc}>
            Have A Chat With AI Bot And Clear All Your Doubts Within An
            Instance.
          </div>
        </div>
        <div className={styles.uploadButton}>
          <button
            className={styles.meow}
            onClick={() => navigate("/chatbotpage")}
          >
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};
