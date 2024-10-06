import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import these for routing
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import FrontBanner from "./Components/FrontBanner";
import { Upload_Ass } from "./Components/Upload_Ass";
import Leaderboard from "./Components/LeaderBoard";
import StudentDashboard from "./StudentDashboard";
import Assignment from "./Assignment";
import Signin from "./Signin";
import Teacher_Create from "./Teacher_Create";
import Login from "./StudentLogin";
import TeacherLogin from "./TeacherLogin";
import Studentass from "./studentass";
import Chattya from "./Chattya";
import Chatbotpage from "./chatbotpage";
import Homepage from "./homepage";
import StudentLogin from "./StudentLogin";
import TeacherDashboard from "./Teachers/TeachersDashboard";
import LeaderBoarddash from "./Leaderboarddash";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/studentdash" element={<StudentDashboard />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route
          path="/leaderboarddash"
          element={<LeaderBoarddash></LeaderBoarddash>}
        />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/TeacherCreate" element={<Teacher_Create />} />
        <Route path="/StudentLogin" element={<Login />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/studentass" element={<Studentass />} />
        <Route path="/chatbotpage" element={<Chatbotpage />} />
      </Routes>
    </Router>
  );
}

export default App;
