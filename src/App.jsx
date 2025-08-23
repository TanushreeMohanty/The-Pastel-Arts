import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/AdminPage"; // optional admin panel
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Welcome to The Pastel Arts</h2>
              </div>
            }
          />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Optional admin route */}
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
