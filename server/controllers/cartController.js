const CartItem = require("../models/cartItems.models.js")
const Product = require('../models/products.models.js')

// Add to cart
 const addToCart = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || qty <= 0)
      return res.status(400).json({ success: false, message: "Invalid product or qty" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    let cartItem = await CartItem.findOne({ product: productId });
    if (cartItem) {
      cartItem.qty += qty;
    } else {
      cartItem = new CartItem({ product: productId, qty });
    }
    await cartItem.save();

    res.json({ success: true, data: cartItem });
  } catch (err) {
    next(err);
  }
};

// Get cart
 const getCart = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find().populate("product");

    const validItems = cartItems.filter(ci => ci.product !== null);
    
    const formatted = validItems.map(ci => ({
      id: ci._id,
      productId: ci.product._id,
      productName: ci.product.name,
      price: ci.product.price,
      productImage: ci.product.image, 
      qty: ci.qty,
      subtotal: ci.product.price * ci.qty
    }));

    const total = formatted.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ success: true, data: { cart: formatted, total } });
  } catch (err) {
    console.error(" Error in getCart:", err);
    next(err);
  }
};


// Update qty
 const updateCartItem = async (req, res, next) => {
  try {
    const { qty } = req.body;
    if (qty <= 0) return res.status(400).json({ success: false, message: "Qty must be > 0" });

    const updated = await CartItem.findByIdAndUpdate(req.params.id, { qty }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete from cart
 const removeFromCart = async (req, res, next) => {
  try {
    const deleted = await CartItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Item not found" });
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {addToCart, getCart, updateCartItem, removeFromCart}