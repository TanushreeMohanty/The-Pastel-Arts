// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // 🔹 Realtime sync with Firestore
  useEffect(() => {
    if (!user?.uid) {
      setCart([]);
      return;
    }

    const cartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(
      cartRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setCart(docSnap.data().items || []);
        } else {
          // initialize empty cart if not exists
          setDoc(cartRef, { items: [] }).catch((err) =>
            console.error("Error initializing cart:", err)
          );
        }
      },
      (error) => {
        console.error("Firestore snapshot error:", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 🔹 Update Firestore helper
  const updateCartInFirestore = async (newCart) => {
    if (!user?.uid) return;
    const cartRef = doc(db, "carts", user.uid);
    try {
      await setDoc(cartRef, { items: newCart }, { merge: true });
    } catch (err) {
      console.error("Error updating cart in Firestore:", err);
    }
  };

  // 🔹 Cart functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart = [...prev, { ...product, qty: 1 }];
      }
      updateCartInFirestore(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      updateCartInFirestore(updatedCart);
      return updatedCart;
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(qty, 1) } : item
      );
      updateCartInFirestore(updatedCart);
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => useContext(CartContext);
