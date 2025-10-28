import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart"; // you’ll build this
import CheckoutPage from "./components/CheckoutPage";
import ReceiptPage from "./components/ReceiptPage";
// no CartProvider import needed here

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Toast Notifications */}
        <ToastContainer position="top-center" autoClose={2000} />

        {/* Header visible on all pages */}
        <Header />

        {/* Page Routes */}
        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/receipt/:id" element={<ReceiptPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
