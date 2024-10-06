import React, { useState } from "react";
import axios from "axios";
import styles from "./chatbot.module.css";

const Basichatbot = ({
  initialMessages = [],
  idealAnswer,
  studentAnswer,
  feedback,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyAp2smBRpuHVa2qSFcawGCm0EDh7h1sElc"; // Replace with actual API key

  const formatResponse = (response) => {
    return response
      .replace(/\\(.?)\\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italics text (corrected regex)
      .replace(/^\s*\*\s/gm, "<li>") // Unordered list
      .replace(/\n/g, "<br/>"); // New line
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    // Constructing the message context for the chatbot
    const context = `
      Feedback: ${feedback}
      User Input: ${input}
    `;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: context + "give answer in short",
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botMessageContent =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from the bot.";
      const formattedResponse = formatResponse(botMessageContent); // Format the response
      const botMessage = { role: "assistant", content: formattedResponse };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("Failed to get a response from the bot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[msg.role]}`}
            >
              <span dangerouslySetInnerHTML={{ __html: msg.content }} />{" "}
              {/* Render formatted HTML */}
            </div>
          ))}
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className={styles.inputField}
          />
          <button
            type="submit"
            disabled={loading}
            className={styles.sendButton}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Basichatbot;
