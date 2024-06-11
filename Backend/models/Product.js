// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  img: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
