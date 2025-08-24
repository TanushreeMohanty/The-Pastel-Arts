// src/pages/AboutUs.jsx
import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="pt-5">About Us</h1>
        <p>
          Welcome to <span className="highlight">The Pastel Arts</span> 🎨 — a
          creative space dedicated to celebrating the beauty of art in all its
          pastel shades.
        </p>
        <p>
          Our mission is to inspire creativity and bring together art lovers,
          creators, and dreamers. From paintings and digital designs to unique
          artistic expressions, we aim to provide a platform where art feels
          warm, soft, and approachable.
        </p>
        <p>
          Thank you for being part of our journey. With every stroke, sketch,
          and idea, we hope to spread color, imagination, and positivity into
          your world. ✨
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
