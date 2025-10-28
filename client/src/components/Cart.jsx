import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
    const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) {
      removeFromCart(id);
      toast.info("Item removed from cart");
    } else {
      updateCartItem(id, newQty);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-4 shadow bg-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || item.productImage}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.productName}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty - 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty + 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col items-end">
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded-xl p-6 shadow bg-white h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <p className="flex justify-between text-gray-700 mb-2">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </p>
            <p className="flex justify-between text-gray-700 mb-4">
              <span>Total Amount:</span>
              <span className="font-semibold">${totalAmount}</span>
            </p>
             <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
