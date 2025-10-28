const router = require('express').Router();
const {getProducts, seedProducts} = require("../controllers/productController.js")

router.get("/", getProducts);
router.post("/seed", seedProducts);

module.exports = router;
