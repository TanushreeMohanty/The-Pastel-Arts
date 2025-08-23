import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: "" });

  // Fetch products
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(items);
  };

  // Fetch orders
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
      price: Number(newProduct.price) // convert price to number
    });
    setNewProduct({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="container my-5">
      <h2>Admin Panel</h2>

      {/* Add Product */}
      <div className="mb-4">
        <h4>Add New Product</h4>
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control mb-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="form-control mb-2"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="form-control mb-2"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Products List */}
      <h4>Products</h4>
      <ul className="list-group mb-4">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name} - ₹{product.price}
            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Orders */}
      <h4>Orders</h4>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order.id} className="list-group-item">
            <strong>{order.user.name}</strong> - ₹{order.totalPrice} <br />
            Items: {order.cart.map(i => `${i.name} x${i.qty}`).join(", ")} <br />
            Address: {order.address}, Phone: {order.phone} <br />
            Payment: {order.paymentMethod}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
