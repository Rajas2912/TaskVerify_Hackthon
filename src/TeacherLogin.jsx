// src/TeacherLogin.jsx
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import styles from "./TeacherLogin.module.css"; // Import the CSS Module for styling

const securitykey = "f4f5f8f9-b679-474b-8542-8d3c114c4f94"; // Security key

const TeacherLogin = () => {
  // State variables for username, password, error message, and success message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      // Send POST request to the backend login endpoint for teacher login
      const response = await axios.post(
        "http://localhost:8808/api/submissions/teacherLogin",
        null, // Body is null since we are using params
        {
          params: {
            username,
            password,
          },
          auth: {
            username: "user",
            password: securitykey, // Include the security key here
          },
        }
      );

      // Handle successful login
      setSuccess(response.data); // Show success message
      navigate("/TeacherDashboard"); // Redirect to the teacher dashboard
    } catch (err) {
      // Handle error response
      setError(
        err.response ? err.response.data : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <img
          className={styles.img1}
          src="src/assets/user.png"
          alt="Admin.jpg"
        />
        <h1 className={styles.heading}>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {/* Show error message */}
        {success && <p className={styles.successMessage}>{success}</p>}
        {/* Show success message */}
      </div>
    </div>
  );
};

export default TeacherLogin;
