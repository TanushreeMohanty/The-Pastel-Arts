import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink px-3">
      <Link className="navbar-brand" to="/">The Pastel Arts</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/shop">Shop</Link></li>
          <li className="nav-item">
            <Auth user={user} setUser={setUser} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
