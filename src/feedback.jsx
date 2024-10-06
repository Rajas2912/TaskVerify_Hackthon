import React, { useState } from "react";
import axios from "axios";
import Chattya from "./Chattya"; // Import your chatbot component
import styles from "./feedback.module.css";

const Feedback = ({ idealAnswer, userAnswer }) => {
  // Accepting props
  const [feedback, setFeedback] = useState("");
  const [showIframe, setShowIframe] = useState(false); // Show chatbot after feedback

  const apiKey = "AIzaSyAp2smBRpuHVa2qSFcawGCm0EDh7h1sElc"; // Replace with actual API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const getFeedback = async () => {
    const requestBody = {
      system_instruction: {
        parts: [
          {
            text: "You are an AI-powered educational assistant tasked with providing personalized feedback. For each assessment, you will be given: Ideal Answer: A reference answer that demonstrates the correct or expected response. Student Answer: The student's response to the same question. Your task is to compare the student's answer with the ideal answer and provide detailed, personalized feedback. Make sure to: Identify correct elements of the student's answer. Point out areas of improvement in the student's response. Provide constructive suggestions for how the student can improve their understanding of the topic. Ensure the feedback is supportive and encouraging, guiding the student toward better learning outcomes. But remember, keep it short. Be harsh if student answer is totally  irrelevant",
          },
        ],
      },
      contents: [
        {
          parts: [
            {
              text: `Ideal answer - ${idealAnswer} Student answer - ${userAnswer}`,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(apiUrl, requestBody);
      const feedbackText = response.data.candidates[0].content.parts[0].text;
      setFeedback(feedbackText); // Set feedback as the initial chatbot message
      setShowIframe(true); // Show chatbot iframe after feedback is fetched
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedback("Error fetching feedback.");
      setShowIframe(true); // Even in case of error, show chatbot
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Students Answer Feedback</h2>
      <button onClick={getFeedback} className={styles.feedbackButton}>
        Get Feedback
      </button>

      {showIframe && (
        <div className={styles.chatContainer1}>
          <Chattya
            initialMessages={[{ role: "assistant", content: feedback }]}
            idealAnswer={idealAnswer}
            userAnswer={userAnswer}
            feedback={feedback}
          />
        </div>
      )}
    </div>
  );
};

export default Feedback;
