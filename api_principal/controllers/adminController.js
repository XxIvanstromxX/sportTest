const Product = require("../models/productsModel");
const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -__v");

    if (users.length === 0 || !users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ message: "Usuarios encontrados", users });
  } catch (err) {}
};

const createProduct = async (req, res) => {
  const { name, description, price, category, brand, size, color, stock } =
    req.body;
  console.log("Received product data:", req.body);
  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !brand ||
    !size ||
    !color ||
    stock === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    console.log("Creating product with data:", {
      name,
      description,
      price,
      category,
      brand,
      size,
      color,
      stock,
    });
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      size,
      color,
      stock,
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getUsers,
  createProduct,
};
