import React, { useState } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Shop.css";

const Shop = () => {
  const [qty, setQty] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [view, setView] = useState("grid"); // 'grid' or 'list'

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQtyChange = (productId, delta) => {
    setQty((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) + delta, 1),
    }));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const categories = ["All", "Diary", "Pen", "Pencil"];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="shop-container">
      <h2 className="shop-title pt-5">Shop Our Pastel Collection</h2>

      {/* Filters */}
      <div className="filters-container">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`products-grid ${view}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />
                <span
                  className={`wishlist-heart ${
                    wishlist.includes(product.id) ? "active" : ""
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  ♥
                </span>
              </div>

              <div className="product-info">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">₹{product.price}</p>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleQtyChange(product.id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{qty[product.id]}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQtyChange(product.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product, qty[product.id])}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
