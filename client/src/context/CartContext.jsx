import React, { createContext, useEffect, useState, useContext } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🧮 Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data.data.cart);
      setTotal(data.data.total);
    } catch (err) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Add item to cart
  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId, qty: 1 });
      toast.success("Added to cart!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  // ❌ Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      toast.info("Item removed from cart");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  // 🔁 Update item quantity
  const updateCartItem = async (itemId, qty) => {
    try {
      await api.put(`/cart/${itemId}`, { qty });
      fetchCart();
    } catch (err) {
      toast.error("Failed to update item");
    }
  };
  
  //clear cart
  const clearCart = () => setCart([]);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loading,
        addToCart,
        removeFromCart,
        updateCartItem,
        fetchCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => useContext(CartContext);
