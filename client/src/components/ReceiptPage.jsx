import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReceiptPage = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/checkout/${id}`);
        if (res.data.success && res.data.data.receipt) {
          setReceipt(res.data.data.receipt); 
        } else {
          toast.error("Receipt not found!");
        }
      } catch (err) {
        toast.error("Error fetching receipt!");
      } finally {
        setLoading(false);
      }
    };
    fetchReceipt();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading receipt...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          ❌ Receipt not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🧾 Receipt Summary
        </h1>

        {/* Customer Info */}
        <div className="border-b pb-4 mb-4 text-gray-700">
          <p><span className="font-semibold">Name:</span> {receipt.name}</p>
          <p><span className="font-semibold">Email:</span> {receipt.email}</p>
          <p><span className="font-semibold">Date:</span> {new Date(receipt.timestamp).toLocaleString()}</p>
          <p><span className="font-semibold">Receipt ID:</span> {receipt._id}</p>
        </div>

        {/* Cart Items */}
        <h2 className="text-xl font-semibold mb-3">🛍️ Purchased Items</h2>
        <div className="border rounded-lg overflow-hidden mb-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Qty</th>
                <th className="py-2 px-4 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {receipt.cart.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.productName}</td>
                  <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{item.qty}</td>
                  <td className="py-2 px-4 border-b">
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-xl font-bold">Total Amount:</h3>
          <p className="text-2xl font-semibold text-green-600">
            ${receipt.total.toFixed(2)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Home
          </button>

          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
