const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authRoleMiddleware } = require("../middlewares/roleMiddleware");
const { getUsers, createProduct } = require("../controllers/adminController");

router.get("/users", protect, authRoleMiddleware("admin"), getUsers);

router.post(
  "/create-product",
  protect,
  authRoleMiddleware("admin"),
  createProduct
);
module.exports = router;
