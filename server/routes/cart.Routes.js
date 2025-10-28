const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

module.exports = router;
