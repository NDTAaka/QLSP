const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    position: Number,
    availabilityStatus: String,
    status: String,
    deleted: Boolean
  }
);
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;