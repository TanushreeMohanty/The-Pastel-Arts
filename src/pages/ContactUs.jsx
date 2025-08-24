// src/pages/ContactUs.jsx
import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you for contacting us! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper mt-5">
      <div className="contact-info">
        <h2 >Get in Touch</h2>
        <p>
          Have questions, feedback, or need support? Fill out the form and our
          team will get back to you as soon as possible.
        </p>
        <ul>
          <li>
            📍 <strong>Address:</strong> 123 Sweet Street, Pastry City
          </li>
          <li>📞 <strong>Phone:</strong> +91 98765 43210</li>
          <li>✉️ <strong>Email:</strong> support@thepastelarts.com</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Contact Us</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
