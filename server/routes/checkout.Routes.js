const express = require("express");
const { checkout, getReceipt } = require("../controllers/checkoutController");

const router = express.Router();

router.post("/", checkout);
router.get("/:id", getReceipt)
module.exports = router;
