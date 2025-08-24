import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // Key for localStorage per user
  const localStorageKey = currentUser ? `cart_${currentUser.uid}` : "cart_guest";

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem(localStorageKey);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, "carts", currentUser.uid);
        const docSnap = await getDoc(cartRef);
        if (docSnap.exists()) {
          setCart(docSnap.data().items || []);
        }
      }
    };
    fetchCart();
  }, [currentUser]);

  // Save cart to Firestore and localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));

    const saveCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, "carts", currentUser.uid);
        await setDoc(cartRef, { items: cart }, { merge: true });
      }
    };
    if (currentUser) saveCart();
  }, [cart, currentUser, localStorageKey]);

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

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 0), 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
