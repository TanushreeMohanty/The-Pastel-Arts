import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Welcome to <span>The Pastel Arts 🎨</span>
        </h1>
        <p>Your one-stop shop for beautiful pastel artworks.</p>
        <Link to="/shop" className="explore-btn">
          Explore Collection
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>✨ Unique Art</h2>
          <p>Handmade pastel artworks crafted with love and creativity.</p>
        </div>
        <div className="feature-card">
          <h2>🎁 Custom Orders</h2>
          <p>Personalize your art piece for special occasions & memories.</p>
        </div>
        <div className="feature-card">
          <h2>🚚 Worldwide Shipping</h2>
          <p>Delivering pastel happiness to your doorstep, anywhere.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
