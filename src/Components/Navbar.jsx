// src/Navbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Import your CSS file here
import ass_nav from "./Assests/Assignment.png";
import chat_nav from "./Assests/Chatbot.png";
import ldr_nav from "./Assests/leaderboard.png";
import pfl_nav from "./Assests/account.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Assignment Checkmate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/assignments"
              >
                <img
                  src={ass_nav}
                  alt="Assignments"
                  className="assignment-icon"
                />
                Assignments
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatbotpage">
                <img
                  src={chat_nav}
                  alt="AI Chat Bot"
                  className="chatbot-icon"
                />
                AI Chat Bot
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboarddash">
                <img
                  src={ldr_nav}
                  alt="Leaderboard"
                  className="assignment-icon"
                />
                LeaderBoard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <Link className="nav-link">
                <img src={pfl_nav} alt="Profile" className="acc-icon" />
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    Go to Home
                  </Link>
                </li>
                {/* Add more dropdown items here if needed */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
