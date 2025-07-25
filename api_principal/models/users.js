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
const VALID_ROLES = ["user", "admin"];

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: VALID_ROLES,
    default: "user",
  },
  preferences: {
    default: {},
    favoriteSizes: {
      type: [String],
      enum: VALID_SIZES,
      default: [],
    },
    favoriteColors: {
      type: [String],
      enum: VALID_COLORS,
      default: [],
    },
    favoriteBrands: {
      type: [String],
      enum: VALID_BRANDS,
      default: [],
    },
  },
  chatHistory: {
    type: [
      {
        preguntaUsuario: { type: String, required: true },
        respuestaChatbot: { type: String, required: true },
        fecha: { type: Date, default: Date.now }, // Fecha de la interacción
      },
    ],
    default: [], // Valor por defecto: un array vacío
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
