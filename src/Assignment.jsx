import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import styles from "./Assignment.module.css"; // Your custom styles
import Feedback from "./feedback";
import Footer1 from "./Components/Footer"; // Ensure this import matches your file naming
const securitykey = "cd80cc9e-91a1-43c0-9e62-78af4449929b";
let id1 = "";
function Assignment() {
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentNumber, setAssignmentNumber] = useState("");
  const [image, setImage] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [idealAnswer, setIdealAnswer] = useState("");
  const [similarityScore, setSimilarityScore] = useState(null);
  const [sid, setSid] = useState(""); // Student ID state variable
  const [score, setScore] = useState(null); // Score state variable
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to upload the image and extract text
  const handleUpload = async () => {
    if (!image || !assignmentNumber) {
      setError("Please select an image and provide an assignment number.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Fetch the ideal answer from the backend based on assignment number
      const idealAnswerResponse = await axios.get(
        `http://localhost:8808/api/submissions/idealAnswer/${assignmentNumber}`,
        {
          auth: {
            username: "user",
            password: securitykey, // Replace with your own credentials
          },
        }
      );

      if (idealAnswerResponse.data) {
        console.log(idealAnswerResponse.data);
        setIdealAnswer(idealAnswerResponse.data);
        id1 = idealAnswerResponse.data; // Use this if you need it for other logic
        console.log(id1);
      } else {
        setError("Ideal answer not found for the given assignment number.");
        setIsLoading(false);
        return;
      }

      // Step 2: Upload the image to Cloudinary via Spring Boot
      const formData = new FormData();
      formData.append("file", image);

      const uploadResponse = await axios.post(
        "http://localhost:8808/api/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          auth: {
            username: "user",
            password: securitykey, // Replace with your own credentials
          },
        }
      );

      const imageUrl = uploadResponse.data;

      // Step 3: Send the Cloudinary image URL to the HuggingFaceController to get the extracted text
      const predictResponse = await axios.post(
        "http://localhost:8808/api/huggingface/predict",
        { imageUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: "user",
            password: securitykey, // Replace with your own credentials
          },
        }
      );

      // Step 4: Parse the extracted text from the predict response
      const responseText = predictResponse.data;
      const dataMatch = responseText.match(/data: \[(.*?), null\]/);
      let extractedText = "";
      if (dataMatch && dataMatch[1]) {
        extractedText = dataMatch[1].replace(/\\n/g, "\n");
        setUserAnswer(extractedText); // Set the user's answer
      } else {
        setUserAnswer("No text extracted");
      }

      // Step 5: Send both the ideal answer and user answer to the comparison API
      const comparisonResponse = await axios.post(
        "http://localhost:8808/api/comparison/compare",
        {
          userAnswer: extractedText,
          idealAnswer: idealAnswerResponse.data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: "user",
            password: securitykey, // Replace with your own credentials
          },
        }
      );

      // Step 6: Extract and display the similarity score from the response
      const similarityScores = comparisonResponse.data; // Assuming response is an array of similarity scores
      const score = similarityScores[0];
      setSimilarityScore(score); // Set the similarity score for display

      // Step 7: Save the submission (sid, assignid, score) to the database
      await saveSubmissionToDatabase(sid, assignmentNumber, score);
    } catch (error) {
      setError("Error processing the request: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save the submission to the database
  const saveSubmissionToDatabase = async (sid, assignid, score) => {
    try {
      await axios.post(
        "http://localhost:8808/api/submissions/save",
        null, // No request body, using params instead
        {
          params: {
            sid: parseInt(sid), // Convert sid to an integer
            assignid: parseInt(assignid), // Convert assignmentNumber to an integer
            score: score.toFixed(2),
          },
          auth: {
            username: "user",
            password: securitykey,
          },
        }
      );
      console.log("Submission saved successfully");
    } catch (error) {
      console.error("Error saving submission: ", error);
      setError("Error saving submission: " + error.message);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload(); // Call handleUpload on form submission
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
                  <label>
                    Student ID:
                    <input
                      className={styles.input1}
                      type="text"
                      value={sid}
                      onChange={(e) => setSid(e.target.value)}
                      required
                    />
                  </label>
                </div>
                {/* <div>
                  <label>
                    Assignment Name:
                    <input
                      type="text"
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      required
                    />
                  </label>
                </div> */}
                <div>
                  <label>
                    Assignment Number:
                    <input
                      type="text"
                      value={assignmentNumber}
                      onChange={(e) => setAssignmentNumber(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Upload Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className={styles.uploadButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Upload"}
                </button>
              </form>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
        <div className={styles.assbelow}>
          <h3>Result</h3>
          <div className="row">
            <div className="col-md-6" id="ideal1">
              <h5>Ideal Answer</h5>
              <p>{idealAnswer}</p>{" "}
              {/* Display the ideal answer from the database */}
            </div>
            <div className="col-md-6" id="answer1">
              <h5>Your Answer</h5>
              <p>{userAnswer}</p> {/* Display the user's answer */}
            </div>
            <div className="col-md-12" id="similarity">
              <h5>Assignment Score</h5>
              <p>
                {similarityScore !== null
                  ? `${(similarityScore * 10).toFixed(2)} `
                  : "Similarity score will be displayed here."}
              </p>{" "}
              {/* Display similarity score */}
            </div>
          </div>
        </div>

        {/* Render Feedback component and pass answers as props */}
        {idealAnswer && userAnswer && (
          <Feedback
            idealAnswer={idealAnswer} // Pass the ideal answer directly
            userAnswer={userAnswer}
          />
        )}
      </div>
      <Footer1></Footer1>
    </>
  );
}

export default Assignment;
