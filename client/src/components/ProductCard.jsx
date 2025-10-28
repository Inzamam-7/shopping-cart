import React from "react";

const ProductCard = ({ product, inCart, onAdd }) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-200 bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-3">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-3">${product.price}</p>

        <button
          onClick={onAdd}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-auto"
        >
          Add to Cart
        </button>
    </div>
  );
};

export default ProductCard;
