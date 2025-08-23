import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase"; // Firebase auth and Google provider
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

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

  // Example: simple admin check (replace with real logic if needed)
  const isAdmin = user?.email === "admin@example.com";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          The Pastel Arts
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Shop</Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#!"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={user.photoURL}
                      alt="profile"
                      className="rounded-circle"
                      width="30"
                      height="30"
                    />
                    <span className="ms-2">{user.displayName}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-primary" onClick={handleLogin}>
                  Login / Signup
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
