import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
        🛍️ Vibe Commerce
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/"
          className={`font-medium hover:text-blue-600 ${
            location.pathname === "/" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          Home
        </Link>

        <Link
          to="/cart"
          className={`relative flex items-center gap-2 font-medium hover:text-blue-600 ${
            location.pathname === "/cart" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <ShoppingCart size={22} />
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
