import React from "react";
import "./Home.css";
import { Carousel, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero d-flex align-items-center justify-content-center text-center">
        <div className="hero-content">
          <h1>The Pastel Arts</h1>
          <p>Bring your imagination to life with our art & stationery collection</p>
          <Button variant="light" className="hero-btn">Shop Now</Button>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="categories container mt-5">
        <h2 className="section-title">Shop by Category</h2>
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="d-flex justify-content-around">
              <div className="category-card">
                <img src="/images/diary1.jpg" alt="Diary" />
                <p>Diary</p>
              </div>
              <div className="category-card">
                <img src="/images/pen1.jpg" alt="Pen" />
                <p>Pen</p>
              </div>
              <div className="category-card">
                <img src="/images/pencil1.jpg" alt="Pencil" />
                <p>Pencil</p>
              </div>
              <div className="category-card">
                <img src="/images/diary2.jpg" alt="Paint" />
                <p>Paint Colors</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-around">
              <div className="category-card">
                <img src="/images/diary2.jpg" alt="Brush" />
                <p>Brush</p>
              </div>
              <div className="category-card">
                <img src="/images/diary3.jpg" alt="Colors" />
                <p>Colors</p>
              </div>
              <div className="category-card">
                <img src="/images/diary1.jpg" alt="Sketchbook" />
                <p>Sketchbook</p>
              </div>
              <div className="category-card">
                <img src="/images/diary1.jpg" alt="Canvas" />
                <p>Canvas</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="featured container mt-5">
        <h2 className="section-title">Featured Products</h2>
        <div className="row">
          {[1, 2, 3].map((item) => (
            <div className="col-md-3" key={item}>
              <Card className="product-card">
                <Card.Img variant="top" src={`/images/diary${item}.jpg`} />
                <Card.Body>
                  <Card.Title>Product {item}</Card.Title>
                  <Card.Text>₹{item * 100}</Card.Text>
                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section className="offers text-center mt-5">
        <h2>Special Offers 🎉</h2>
        <p>Flat 20% Off on All Paints & Brushes</p>
        <Button variant="dark">Shop Offers</Button>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose container mt-5 text-center">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="row mt-4">
          <div className="col-md-3">
            <i className="fas fa-paint-brush fa-2x"></i>
            <h5>Premium Quality</h5>
            <p>Only the best materials for your art</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-shipping-fast fa-2x"></i>
            <h5>Fast Delivery</h5>
            <p>Get your products quickly</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-wallet fa-2x"></i>
            <h5>Affordable Prices</h5>
            <p>Art supplies at student-friendly rates</p>
          </div>
          <div className="col-md-3">
            <i className="fas fa-star fa-2x"></i>
            <h5>Trusted by Artists</h5>
            <p>Thousands of happy customers</p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="what-we-offer container mt-5 text-center">
        <h2 className="section-title">What We Offer</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <img src="/images/diary2.jpg" alt="Workshop" />
            <h5>Workshops</h5>
            <p>Join art workshops to improve your skills</p>
          </div>
          <div className="col-md-4">
            <img src="/images/diary2.jpg" alt="Custom Orders" />
            <h5>Custom Orders</h5>
            <p>Get personalized art supplies</p>
          </div>
          <div className="col-md-4">
            <img src="/images/diary2.jpg" alt="Gift Items" />
            <h5>Gift Items</h5>
            <p>Perfect gifts for art lovers</p>
          </div>
        </div>
      </section>

      {/* Customer Feedback */}
      <section className="feedback container mt-5 text-center">
        <h2 className="section-title">Customer Feedback</h2>
        <Carousel>
          <Carousel.Item>
            <p>"Amazing quality and fast delivery. Highly recommend!"</p>
            <h6>- Riya Sharma</h6>
          </Carousel.Item>
          <Carousel.Item>
            <p>"The paints are vibrant and perfect for my artwork."</p>
            <h6>- Aarav Patel</h6>
          </Carousel.Item>
          <Carousel.Item>
            <p>"Loved the sketchbooks. Definitely ordering again!"</p>
            <h6>- Sneha Kapoor</h6>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
};

export default Home;
