import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on startup (so items don't vanish on refresh)
  useEffect(() => {
    const savedCart = localStorage.getItem('localCart');
    if (savedCart) setCart(JSON.parse(savedCart));
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
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  // 2. Remove Item
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // 3. Update Quantity
  const updateQty = (id, qty) => {
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? { ...item, qty: parseInt(qty) } : item)
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

// Custom hook for easy access
export const useCart = () => useContext(CartContext);