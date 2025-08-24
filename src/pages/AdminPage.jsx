import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // Fetch products
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  // Fetch orders
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrders(items);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Add product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    await addDoc(collection(db, "products"), {
      ...newProduct,
      price: Number(newProduct.price),
    });
    setNewProduct({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-center">Admin Dashboard</h2>

      {/* Add Product */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="card-title mb-3">Add New Product</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-3 px-4"
            onClick={handleAddProduct}
          >
            <i className="bi bi-plus-circle me-1"></i> Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h4 className="card-title mb-3">Products</h4>
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price (₹)</th>
                <th>Description</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>₹{product.price.toLocaleString("en-IN")}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        width="50"
                        className="rounded"
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Orders</h4>
          {orders.length === 0 ? (
            <p className="text-muted">No orders found.</p>
          ) : (
            <div className="list-group">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="list-group-item border-0 shadow-sm mb-3 rounded"
                >
                  <h6 className="fw-bold">{order.user?.name || "Unknown"}</h6>
                  <p className="mb-1">
                    <strong>Total:</strong> ₹
                    {order.totalPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="mb-1">
                    <strong>Items:</strong>{" "}
                    {order.cart
                      .map((i) => `${i.name} x${i.qty}`)
                      .join(", ")}
                  </p>
                  <p className="mb-1">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p className="mb-0">
                    <strong>Payment:</strong> {order.paymentMethod}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
