import React from "react";
import Chattya from "./Chattya";
import Navbar from "./Components/Navbar";
import Footer1 from "./Components/Footer";
import styles from "./chatbotpage.module.css";
import Basichatbot from "./basicchatbot";

function Chatbotpage() {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.chatbox1}>
        <Basichatbot></Basichatbot>
      </div>

      <Footer1></Footer1>
    </>
  );
}
export default Chatbotpage;
