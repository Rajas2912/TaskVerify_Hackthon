import React from "react";
import Navbar from "../Components/Navbar";
import FrontBanner from "../Components/FrontBanner";
import styles from "./TeacherDashboard.module.css";
import T_Card from "./T_Card";
import { Upload_Ass } from "../Components/Upload_Ass";
import { Create_upload } from "../Components/Create_upload";

function TeacherDashboard() {
  return (
    <>
      <div className={styles.mainpage}>
        <Navbar></Navbar>
        {/* <FrontBanner></FrontBanner> */}
        <Create_upload></Create_upload>
        {/* <T_Card></T_Card> */}
      </div>
    </>
  );
}
export default TeacherDashboard;
