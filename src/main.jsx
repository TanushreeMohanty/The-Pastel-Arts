import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";   // 👈 import AuthProvider
import { CartProvider } from "./context/CartContext.jsx";   // 👈 import CartProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>        {/* 👈 Must be outside */}
      <CartProvider>      {/* 👈 Inside AuthProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
