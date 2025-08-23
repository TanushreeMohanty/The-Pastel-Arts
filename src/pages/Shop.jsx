import React, { useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const [qty, setQty] = useState({});
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQty, removeFromCart, totalPrice } = useCart();

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Shop</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">₹{product.price}</p>

                <div className="d-flex mb-2 align-items-center gap-2">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setQty({ ...qty, [product.id]: Math.max((qty[product.id] || 1) - 1, 1) })}
                  >-</button>
                  <span>{qty[product.id] || 1}</span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setQty({ ...qty, [product.id]: (qty[product.id] || 1) + 1 })}
                  >+</button>
                </div>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product, qty[product.id] || 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-5">Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <span>{item.name}</span>
                  <div className="d-flex align-items-center gap-1">
                    <button className="btn btn-secondary btn-sm" onClick={() => updateCartQty(item.id, -1)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn btn-secondary btn-sm" onClick={() => updateCartQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>₹{item.price * item.qty}</span>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-success" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
          <p className="fw-bold mt-3">Total: ₹{totalPrice}</p>
        </>
      )}
    </div>
  );
};

export default Shop;
