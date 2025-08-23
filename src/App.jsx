import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<div style={{ padding: "1rem" }}><h2>Welcome to The Pastel Arts</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
