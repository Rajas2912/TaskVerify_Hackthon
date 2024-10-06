import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Using Chart.js for bar chart
import styles from "./T_card.module.css"; // Import CSS module for styling

const securitykey = "6267b963-ae86-498a-a3df-83d252e5519a";
// Define your security key
const T_card = ({ assignmentId, assignmentNumber }) => {
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [idealAnswer, setIdealAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch ideal answer and score distribution
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        assignmentNumber = 1;
        // Step 1: Fetch the ideal answer from the backend based on assignment number
        const idealAnswerResponse = await axios.get(
          `http://localhost:8808/api/submissions/idealAnswer/${assignmentNumber}`,
          {
            auth: {
              username: "user",
              password: securitykey,
            },
          }
        );

        if (idealAnswerResponse.data) {
          setIdealAnswer(idealAnswerResponse.data);
        } else {
          setError("Ideal answer not found for the given assignment number.");
          setIsLoading(false);
          return;
        }
        assignmentId = 1;
        // Step 2: Fetch score distribution
        const scoreDistributionResponse = await axios.get(
          `http://localhost:8808/api/submissions/score-distribution/1`,
          {
            auth: {
              username: "user",
              password: securitykey,
            },
          }
        );

        setScoreDistribution(scoreDistributionResponse.data);
      } catch (err) {
        setError("Error processing the request: " + err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [assignmentId, assignmentNumber]);

  // Prepare data for chart
  const chartData = {
    labels: scoreDistribution.map((item) => item.scoreRange),
    datasets: [
      {
        label: "Number of Students",
        data: scoreDistribution.map((item) => item.numberOfStudents),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Light blue color
        borderColor: "rgba(75, 192, 192, 1)", // Dark blue color for border
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.card}>
      <h3>Score Distribution</h3>
      {error && <p className={styles.error}>{error}</p>}
      {isLoading ? (
        <p className={styles.loading}>Loading data...</p>
      ) : (
        scoreDistribution.length > 0 && (
          <div className={styles.chartContainer}>
            <Bar
              data={chartData}
              options={{
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        )
      )}
      {idealAnswer && (
        <div>
          <h4>Ideal Answer</h4>
          <p>{idealAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default T_card;
