import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero pt-5">
        <h1>
          Welcome to <span>The Pastel Arts</span>
        </h1>
        <p>
          Discover timeless pastel artworks that bring elegance, creativity, and
          warmth to your spaces.
        </p>
        <Link to="/shop" className="explore-btn">
          Explore Collection
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>Unique Art</h2>
          <p>Handmade pastel artworks crafted with care and creativity.</p>
        </div>
        <div className="feature-card">
          <h2>Custom Orders</h2>
          <p>Personalize your art piece for special occasions & memories.</p>
        </div>
        <div className="feature-card">
          <h2>Worldwide Shipping</h2>
          <p>Delivering pastel artwork safely to your doorstep, anywhere.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About The Pastel Arts</h2>
        <p>
          At <strong>The Pastel Arts</strong>, we believe art is more than just
          decoration — it’s an expression of identity, passion, and stories. Our
          mission is to make every artwork meaningful, whether it’s a ready-made
          masterpiece or a custom creation tailored just for you.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-card">
          <p>
            “Absolutely stunning artwork! The colors and textures are beyond
            what I expected. Truly a centerpiece in my home.”
          </p>
          <h4>- Sarah M.</h4>
        </div>
        <div className="testimonial-card">
          <p>
            “I ordered a custom piece for my anniversary, and it was perfect.
            Thank you for making our memories last forever.”
          </p>
          <h4>- Daniel K.</h4>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Want to Own a Personalized Artwork?</h2>
        <p>Let us bring your vision to life with custom pastel creations.</p>
        <Link to="/contact" className="contact-btn">
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default Home;
