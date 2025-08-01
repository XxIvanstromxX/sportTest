const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { authRoleMiddleware } = require("../middlewares/roleMiddleware");

router.get("/", getAllProducts);
router.get("/:id", getProductById);

module.exports = router;
