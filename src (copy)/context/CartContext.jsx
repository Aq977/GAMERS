import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product_id === product.product_id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });

    showMessage("Product added to cart successfully");
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== id));

    showMessage("Product removed from cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, message }}>
      {children}
    </CartContext.Provider>
  );
};
