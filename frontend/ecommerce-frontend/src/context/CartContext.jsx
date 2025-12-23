import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem('localCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(cart));
  }, [cart]);

  // 1. Add to Cart 
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: quantity }];
    });
  };

  // 2. Remove Item
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // 3. Update Quantity 
  const updateQty = (id, newQty) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, parseInt(newQty)) } : item
      )
    );
  };

  // 4. Clear Cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook with safety check
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};