import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Send POST request to backend checkout route
      const res = await axios.post("http://localhost:5000/api/checkout", formData);

      if (res.data.success) {
        const receiptId = res.data.data.id; // 
        toast.success("Checkout successful! Redirecting to receipt...");
        clearCart();

        // Navigate to Receipt page
        navigate(`/receipt/${receiptId}`);
      } else {
        toast.error("Something went wrong during checkout!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          🧾 Checkout Form
        </h2>

        {/* Name Field */}
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email Field */}
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Complete Checkout"}
        </button>

        <p
          className="text-center text-gray-500 text-sm mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </p>
      </form>
    </div>
  );
};

export default CheckoutPage;
