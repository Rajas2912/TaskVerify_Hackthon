import React, { useState, useEffect } from "react";
import styles from "./BackgroundEffect.module.css";

const BackgroundEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update CSS variables for the gradient position
  useEffect(() => {
    document.documentElement.style.setProperty("--x", `${mousePosition.x}px`);
    document.documentElement.style.setProperty("--y", `${mousePosition.y}px`);
  }, [mousePosition]);

  return <div className={styles.backgroundEffect}></div>;
};

export default BackgroundEffect;
