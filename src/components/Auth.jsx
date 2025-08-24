import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import "./Auth.css"; // Custom CSS for elegant styling

const Auth = ({ user, setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="auth-container">
      {user ? (
        <div className="auth-logged-in">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="profile"
              className="auth-profile-img"
            />
          )}
          <span className="auth-welcome">Welcome, {user.displayName}</span>
          <button className="auth-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="auth-btn login-btn" onClick={handleLogin}>
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
