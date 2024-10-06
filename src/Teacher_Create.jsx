import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import styles from "./Teacher_Create.module.css"; // Your custom styles

const securitykey = "d7b5d260-6da3-48f8-94e5-1a6cb3150ca9";

function Teacher_Create() {
  const [assignmentId, setAssignmentId] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentAnswer, setAssignmentAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Save the assignment to the database
      await axios.post(
        "http://localhost:8808/api/submissions/create",
        {
          aid: parseInt(assignmentId), // Convert to integer
          aname: assignmentName,
          aans: assignmentAnswer,
        },
        {
          auth: {
            username: "user",
            password: securitykey,
          },
        }
      );
      alert("Assignment created successfully!"); // Show success message
      // Clear the input fields
      setAssignmentId("");
      setAssignmentName("");
      setAssignmentAnswer("");
    } catch (error) {
      setError("Error creating assignment: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div className={styles.assbanner}>
          <div className={styles.asscheck}>
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className={styles.label1}>
                    Assignment ID:
                    <input
                      type="text"
                      value={assignmentId}
                      onChange={(e) => setAssignmentId(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className={styles.label1}>
                    Assignment Name:
                    <input
                      type="text"
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label className={styles.label1}>Assignment Answer:</label>
                  <textarea
                    className={styles.assanswer}
                    value={assignmentAnswer}
                    onChange={(e) => setAssignmentAnswer(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={styles.createButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Assignment"}
                </button>
              </form>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacher_Create;
