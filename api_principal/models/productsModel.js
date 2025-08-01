const mongoose = require("mongoose");
const { Schema } = mongoose;

const VALID_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const VALID_COLORS = [
  "negro",
  "blanco",
  "azul",
  "rojo",
  "verde",
  "gris",
  "rosa",
  "amarillo",
];
const VALID_BRANDS = [
  "Nike",
  "Adidas",
  "Puma",
  "Under Armour",
  "Reebok",
  "New Balance",
];

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    index: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    enum: VALID_BRANDS,
    required: true,
    index: true,
  },
  size: {
    type: String,
    enum: VALID_SIZES,
    required: true,
    index: true,
  },
  color: {
    type: String,
    enum: VALID_COLORS,
    required: true,
    index: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
