import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

// Security key for authentication
const securitykey = "42b3827b-ae0c-4d8f-b677-d987c09a9fdf"; // Replace with your actual security key
const assid = 1;

const Leaderboard = () => {
  // State variables for leaderboard data and error handling
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch leaderboard data from the backend using the security key
    axios
      .get(`http://localhost:8808/api/submissions/leaderboard/${assid}`, {
        auth: {
          username: "user", // Basic username
          password: securitykey, // Include the security key for authentication
        },
      })
      .then((response) => {
        setLeaderboardData(response.data); // Set leaderboard data on successful fetch
        console.log(response.data); // Log the fetched data to verify
      })
      .catch((error) => {
        setError(
          error.response
            ? error.response.data
            : "Failed to fetch leaderboard data."
        ); // Set error message if the fetch fails
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Table for displaying leaderboard data */}
      <table border="1" style={{ width: "50%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Student ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the leaderboard data with serial number */}
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Serial number starts from 1 */}
              <td>{entry.sid}</td>{" "}
              {/* Use property names instead of array indexing */}
              <td>{entry.score}</td>{" "}
              {/* Ensure these properties match your Submission structure */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
