import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useCart } from "../context/CartContext";
import "./Navbar.css"; // custom styles

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  const isAdmin = user?.email === "admin@example.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm custom-navbar fixed-top">
      <div className="container">
        {/* Brand with Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo.png" alt="Logo" className="brand-logo me-2" />
          <span className="fw-bold brand-text">The Pastel Arts</span>
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center nav-animate">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                <i className="bi bi-bag-check me-1"></i> Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i> About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="bi bi-envelope me-1"></i> Contact Us
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  <i className="bi bi-speedometer2 me-1"></i> Admin
                </Link>
              </li>
            )}

            {/* Cart Button */}
            <li className="nav-item mx-2">
              <button
                className="nav-btn position-relative d-flex align-items-center"
                onClick={() => navigate("/cart")}
              >
                <i className="bi bi-cart-fill me-1"></i> Cart
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

            {/* User/Login */}
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#!"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="rounded-circle me-2"
                    width="30"
                    height="30"
                  />
                  <span>{user.displayName}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary nav-btn"
                  onClick={handleLogin}
                >
                  <i className="bi bi-person-circle me-1"></i> Login / Signup
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
