const express = require("express");
const { body } = require("express-validator");
const { register, login, getAdmins, logout } = require("../controllers/authController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

// User Registration Route
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["user", "admin"]),
  ],
  register
);

// User Login Route
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists(),
  ],
  login
);

// Get Admins Route (protected)
router.get("/admins", protect, getAdmins);

// Logout Route
router.get("/logout", logout);

module.exports = router;



