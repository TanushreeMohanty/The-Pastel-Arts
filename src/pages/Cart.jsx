// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  // 🔹 Increase quantity
  const increaseQty = (id, currentQty) => {
    updateQty(id, currentQty + 1);
  };

  // 🔹 Decrease quantity
  const decreaseQty = (id, currentQty) => {
    updateQty(id, Math.max(1, currentQty - 1));
  };

  // 🔹 Calculate total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <div className="cart-actions">
                    <button onClick={() => decreaseQty(item.id, item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id, item.quantity)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
