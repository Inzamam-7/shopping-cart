const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.Routes");
const cartRoutes = require("./routes/cart.Routes");
const checkoutRoutes = require("./routes/checkout.Routes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin:'*',
  methods:['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Vibe Commerce API is running ✅");
});

// Error handler
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
