import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Leaderboard.module.css"; // Importing CSS module for styling

const securityKey = "e5e1217b-a0ed-49ff-a523-beffd451be77"; // Replace with your actual security key

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [error, setError] = useState("");
  const [assignmentId, setAssignmentId] = useState(1); // Default assignment ID
  const [assignmentIds, setAssignmentIds] = useState([]); // Available assignment IDs for dropdown

  useEffect(() => {
    // Fetch available assignment IDs from the backend to populate dropdown
    axios
      .get("http://localhost:8808/api/submissions/assignments/ids", {
        auth: {
          username: "user", // Basic username
          password: securityKey, // Include the security key for authentication
        },
      })
      .then((response) => {
        setAssignmentIds(response.data); // Set available assignment IDs for dropdown
      })
      .catch((error) => {
        setError(
          error.response
            ? error.response.data
            : "Failed to fetch assignment IDs."
        );
      });
  }, []);

  useEffect(() => {
    if (assignmentId) {
      // Fetch leaderboard data when the assignment ID changes
      axios
        .get(
          `http://localhost:8808/api/submissions/leaderboard/${assignmentId}`,
          {
            auth: {
              username: "user", // Basic username
              password: securityKey, // Include the security key for authentication
            },
          }
        )
        .then((response) => {
          const sortedData = response.data.sort((a, b) => b.score - a.score); // Sort by score in descending order
          setLeaderboardData(sortedData);

          // Fetch usernames for all student IDs in the leaderboard
          const sids = sortedData.map((entry) => entry.sid);
          fetchUsernames(sids);
        })
        .catch((error) => {
          setError(
            error.response
              ? error.response.data
              : "Failed to fetch leaderboard data."
          );
        });
    }
  }, [assignmentId]); // Dependency on assignmentId

  // Fetch usernames based on provided student IDs
  const fetchUsernames = async (sids) => {
    try {
      const response = await axios.get(
        `http://localhost:8808/api/submissions/usernames?sids=${sids.join(
          ","
        )}`,
        {
          auth: {
            username: "user",
            password: securityKey,
          },
        }
      );
      const usernameData = response.data;
      const usernamesMap = {};
      usernameData.forEach((user) => {
        usernamesMap[user.sid] = user.suname; // Assuming suname is the username field
      });
      setUsernames(usernamesMap);
    } catch (error) {
      console.error("Failed to fetch usernames:", error);
    }
  };

  // Generate a random color for each serial number circle
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Extract top three students
  const topThree = leaderboardData.slice(0, 3);
  const remainingStudents = leaderboardData.slice(3);

  return (
    <div className={styles.leaderboardContainer}>
      <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
      {error && <p className={styles.error}>{error}</p>}

      {/* Dropdown to select assignment ID */}
      <div className={styles.assignmentSelector}>
        <label htmlFor="assignmentId">Select Assignment:</label>
        <select
          id="assignmentId"
          value={assignmentId}
          onChange={(e) => setAssignmentId(e.target.value)}
        >
          {assignmentIds.map((id) => (
            <option key={id} value={id}>
              Assignment {id}
            </option>
          ))}
        </select>
      </div>

      {/* Top 3 cards layout */}
      <div className={styles.topThreeContainer}>
        {topThree.length > 1 && (
          <div className={`${styles.card} ${styles.secondPlace}`}>
            <div className={styles.rankTop}></div>
            <div className={styles.cardContent}>
              <h2 className={styles.secondrank}>2nd Rank</h2>
              <p>Student ID: {topThree[1]?.sid}</p>
              <p>Username: {usernames[topThree[1]?.sid]}</p>
              <p>Score: {topThree[1]?.score}</p>
            </div>
            <div className={styles.rankBottom}></div>
          </div>
        )}
        {topThree.length > 0 && (
          <div className={`${styles.card} ${styles.firstPlace}`}>
            <div className={styles.rankTop}></div>
            <div className={styles.cardContent}>
              <h2 className={styles.firstrank}>1st Rank</h2>
              <p>Student ID: {topThree[0]?.sid}</p>
              <p>Username: {usernames[topThree[0]?.sid]}</p>
              <p>Score: {topThree[0]?.score}</p>
            </div>
            <div className={styles.rankBottom}></div>
          </div>
        )}
        {topThree.length > 2 && (
          <div className={`${styles.card} ${styles.thirdPlace}`}>
            <div className={styles.rankTop}></div>
            <div className={styles.cardContent}>
              <h2 className={styles.thirdrank}>3rd Rank</h2>
              <p>Student ID: {topThree[2]?.sid}</p>
              <p>Username: {usernames[topThree[2]?.sid]}</p>
              <p>Score: {topThree[2]?.score}</p>
            </div>
            <div className={styles.rankBottom}></div>
          </div>
        )}
      </div>

      {/* Remaining students in table format */}
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Student ID</th>
            <th>Username</th> {/* New column for username */}
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {remainingStudents.map((entry, index) => (
            <tr key={index}>
              <td>
                <div
                  className={styles.serialNumberCircle}
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {index + 4} {/* Serial number starts from 4 */}
                </div>
              </td>
              <td>{entry.sid}</td>
              <td>{usernames[entry.sid]}</td> {/* Display username */}
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
