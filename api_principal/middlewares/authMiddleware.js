const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

const protect = async (req, res, next) => {
  //Check if the request is from a chatbot, validate de X-API-Key header
  // Esto funciona para evitar que el middleware de autenticación se aplique a las peticiones del chatbot
  // Además funciona para fusionar el microservicio del chatbot con la API principal
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.CHATBOT_API_KEY) {
    console.log("Chatbot request detected, skipping authentication");
    return next();
  }

  //Check if the request has a valid JWT token
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", req.user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
