import React from "react";
import FrontBanner from "./Components/FrontBanner";
import { Upload_Ass } from "./Components/Upload_Ass";
import BackgroundEffect from "./BackgroundEffect"; // Import the BackgroundEffect component
import styles from "./homepage.module.css";
import { Upload2Cards } from "./Components/Upload2Cards";
import Footer1 from "./Components/Footer";

function Homepage() {
  return (
    <>
      {/* BackgroundEffect as the background */}
      <BackgroundEffect />

      {/* Main content on top of the background */}
      <div className={styles.mainpage}>
        <FrontBanner />
        <Upload2Cards></Upload2Cards>
      </div>
      <Footer1></Footer1>
    </>
  );
}

export default Homepage;
