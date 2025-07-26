const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

//Obtener perfil de usuario
router.get("/profile", protect, getUserProfile);

//Modificar perfil de usuario
router.put("/profile", protect, updateUserProfile);

module.exports = router;
