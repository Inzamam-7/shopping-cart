import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cart } = useCart();

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🛒 Shop Our Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const inCart = cart.some((item) => item.productId === product._id); 
          return (
            <ProductCard
              key={product._id}
              product={product}
              inCart={inCart}
              onAdd={() => addToCart(product._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
