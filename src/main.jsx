import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Global CSS
import "./index.css";

// App & Contexts
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>      {/* Auth context must wrap everything */}
      <CartProvider>    {/* Cart context inside AuthProvider */}
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
