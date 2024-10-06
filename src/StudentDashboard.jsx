import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import FrontBanner from "./Components/FrontBanner";
import { Upload_Ass } from "./Components/Upload_Ass";
import styles from "./StudentDashboard.module.css";
import Leaderboard from "./Components/LeaderBoard";
import Footer1 from "./Components/Footer";

function StudentDashboard() {
  return (
    <>
      <div className={styles.mainpage}>
        <Navbar></Navbar>
        {/* <FrontBanner></FrontBanner> */}
        <Upload_Ass></Upload_Ass>
        <Leaderboard></Leaderboard>
        <Footer1></Footer1>
      </div>
    </>
  );
}
export default StudentDashboard;
