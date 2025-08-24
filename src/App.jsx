import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ new footer component
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import AdminPage from "./pages/AdminPage";
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext";
import { onAuthStateChanged } from "firebase/auth";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
function App() {
  const [user, setUser] = useState(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        {/* Navbar fixed at top */}
        <Navbar user={user} setUser={setUser} />

        {/* Main content wrapper */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
