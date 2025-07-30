const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { authRoleMiddleware } = require("../middlewares/roleMiddleware");
const { getUsers } = require("../controllers/adminController");

router.get("/users", protect, authRoleMiddleware("admin"), getUsers);

module.exports = router;
