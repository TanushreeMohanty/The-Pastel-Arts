import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const auth = getAuth();
  const db = getFirestore(app);
  const navigate = useNavigate();
  const { cart, clearCart, totalPrice } = useCart();

  const [user, setUser] = useState({ name: "", email: "" });
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({ name: currentUser.displayName || "", email: currentUser.email || "" });
    } else {
      navigate("/"); // redirect if not logged in
    }
  }, [auth, navigate]);

  const handleOrder = async () => {
    if (!address.trim() || !phone.trim()) {
      alert("Please fill in address and phone number");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        user,
        cart,
        address,
        phone,
        paymentMethod,
        totalPrice,
        createdAt: new Date()
      });
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container thank-you">
        <h2>🎉 Thank you for shopping at <span>The Pastel Arts</span>!</h2>
        <p>Your order has been placed successfully 💖</p>
        <button className="back-home-btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Secure Checkout 🛒</h2>
      <div className="checkout-grid">

        {/* Order Summary */}
{/* Order Summary */}
<div className="order-summary">
  <h4>Order Summary</h4>
  {cart.length === 0 ? (
    <p className="empty-cart">Your cart is empty 😢</p>
  ) : (
    <ul className="cart-list">
      {cart.map((item) => (
        <li key={item.id} className="cart-item">
          <span>
            {item.name} × {item.qty || item.quantity || 1}
          </span>
          <span>₹{(item.price || 0) * (item.qty || item.quantity || 1)}</span>
        </li>
      ))}
      <li className="cart-item total">
        <span>Total</span>
        {/* ✅ Use totalPrice from CartContext */}
        <span>₹{totalPrice}</span>
      </li>
    </ul>
  )}
</div>


        {/* User Form */}
        <div className="checkout-form">
          <h4>Delivery Details</h4>
          <input type="text" className="form-control" value={user.name} readOnly />
          <input type="email" className="form-control" value={user.email} readOnly />
          <textarea
            className="form-control"
            placeholder="Enter delivery address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <input
            type="text"
            className="form-control"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">💵 Cash on Delivery</option>
            <option value="Online">💳 Online Payment</option>
          </select>
          <button
            className="place-order-btn"
            onClick={handleOrder}
            disabled={cart.length === 0}
          >
            ✅ Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
