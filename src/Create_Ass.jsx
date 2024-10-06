import React, { useState } from "react";
// import './Create_Ass.css';

const Create_Ass = () => {
  const [assignmentNumber, setAssignmentNumber] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [assignmentAnswer, setAssignmentAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ assignmentNumber, problemStatement, assignmentAnswer });
    setAssignmentNumber("");
    setProblemStatement("");
    setAssignmentAnswer("");
  };

  return (
    <div className="assignment-card">
      <h2>Create New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assignment Number:</label>
          <input
            type="text"
            value={assignmentNumber}
            onChange={(e) => setAssignmentNumber(e.target.value)}
            placeholder="Enter assignment number"
            required
          />
        </div>
        <div className="form-group">
          <label>Assignment Problem Statement:</label>
          <textarea
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Enter problem statement"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Assignment Answer:</label>
          <textarea
            value={assignmentAnswer}
            onChange={(e) => setAssignmentAnswer(e.target.value)}
            placeholder="Enter expected answer"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create_Ass;
