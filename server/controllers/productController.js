const Product = require("../models/products.models")
const productData = require("../data/product")
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

// Seed mock products
const seedProducts = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    const inserted = await Product.insertMany(productData);
    res.json({ success: true, data: inserted });
  } catch (err) {
    next(err);
  }
};

module.exports = {getProducts, seedProducts}
