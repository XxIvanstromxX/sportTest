const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI, DATABASE_NAME } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DATABASE_NAME,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
