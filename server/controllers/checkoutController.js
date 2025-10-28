const CartItem = require("../models/cartItems.models.js");
const Receipt = require("../models/receipt.models.js");

const checkout = async (req, res, next) => {
  try {
     console.log(req.body);
    const { name, email } = req.body;
    
    if (!name || !email)
      return res.status(400).json({ success: false, message: "Name and email required" });

    const cartItems = await CartItem.find().populate("product");
    if (cartItems.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    const items = cartItems.map(ci => ({
      productName: ci.product.name,
      price: ci.product.price,
      qty: ci.qty,
    }));

    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const receipt = await Receipt.create({ name, email, cart: items, total });
    await CartItem.deleteMany(); 

    res.status(201).json({
      success: true,
      message: "Checkout successful",
      data: { id: receipt._id, receipt },
    });
  } catch (err) {
    next(err);
  }
};

const getReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    if (!receipt)
      return res.status(404).json({ success: false, message: "Receipt not found" });

    res.json({ success: true, 
      data: {
        id:receipt._id,
        receipt
      } });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkout, getReceipt };
