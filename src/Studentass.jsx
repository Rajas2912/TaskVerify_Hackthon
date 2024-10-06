import React from "react";
import { Route, Routes } from "react-router-dom"; // Import only Route and Routes
import Assignment from "./Assignment";
import Chattya from "./Chattya";
import Feedback from "./feedback";

function Studentass() {
  return (
    <>
      <Assignment></Assignment>
      {/* <Feedback></Feedback>
      <Chattya></Chattya> */}
    </>

    // <Routes>
    //   <Route path="/" element={<Assignment />} />{" "}
    //   {/* Main route for Assignment */}
    //   <Route path="/feedback" element={<Feedback />} /> {/* Feedback route */}
    //   <Route path="/chat" element={<Chattya />} /> {/* Chatbot route */}
    // </Routes>
  );
}

export default Studentass;
