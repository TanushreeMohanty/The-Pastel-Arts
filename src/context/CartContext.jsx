// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // assumes you have auth context

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth(); // get logged-in user

  // 🔹 Load cart from Firestore on login
useEffect(() => {
  const fetchCart = async () => {
    if (currentUser) {
      try {
        const cartRef = doc(db, "carts", currentUser.uid);
        const docSnap = await getDoc(cartRef);
        if (docSnap.exists()) {
          setCart(docSnap.data().items || []);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    } else {
      setCart([]);
    }
  };
  fetchCart();
}, [currentUser]);

  // 🔹 Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, "carts", currentUser.uid);
        await setDoc(cartRef, { items: cart }, { merge: true });
      }
    };
    if (currentUser) saveCart();
  }, [cart, currentUser]);

  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity) || 1;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: qty }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, newQty) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    )
  );
};

  const clearCart = () => setCart([]);

  
  // ✅ Helper: total items
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);

  // ✅ Helper: total price
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 0)),
    0
  );

  return (
<CartContext.Provider
  value={{ cart, addToCart, removeFromCart, clearCart, updateQty, cartCount, cartTotal }}
>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
