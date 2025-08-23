import React, { useState } from "react";
import { products } from "../data/products";

const Shop = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

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
                <button className="btn btn-primary mt-auto" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-5">Cart</h3>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul className="list-group">
        {cart.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name} x {item.qty} 
            <span>₹{item.price * item.qty}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 fw-bold">Total: ₹{cart.reduce((acc, item) => acc + item.price * item.qty, 0)}</p>
    </div>
  );
};

export default Shop;
