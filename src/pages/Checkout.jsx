import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import { useCart } from "../context/CartContext";

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
      setUser({ name: currentUser.displayName, email: currentUser.email });
    } else {
      navigate("/"); // redirect if not logged in
    }
  }, [auth, navigate]);

  const handleOrder = async () => {
    if (!address || !phone) {
      alert("Please fill in address and phone number");
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
    }
  };

  if (orderPlaced) {
    return (
      <div className="container my-5 text-center">
        <h2>Thank you for shopping at The Pastel Arts!</h2>
        <p>Your order has been placed successfully.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h4>User Details</h4>
          <input type="text" className="form-control mb-2" value={user.name} readOnly />
          <input type="email" className="form-control mb-2" value={user.email} readOnly />
          <textarea className="form-control mb-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
          <input type="text" className="form-control mb-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <select className="form-select mb-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="COD">Cash on Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
          <button className="btn btn-success mt-2" onClick={handleOrder}>Place Order</button>
        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cart.length === 0 ? <p>Your cart is empty</p> : (
            <ul className="list-group">
              {cart.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{item.name} x {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
