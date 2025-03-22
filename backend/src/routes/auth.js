require("dotenv").config();
const express = require("express");
const AuthController = require("../controllers/auth-controller");
const { mapControllerFunction } = require("../helpers");

const router = express.Router();

router.use(express.json());

// Register Route
router.post("/register", mapControllerFunction(AuthController, "register"));
// Login Route
router.post("/login", mapControllerFunction(AuthController, "login"));
// Refresh Token Route
router.post(
  "/refresh-token",
  mapControllerFunction(AuthController, "fetchRefreshToken")
);

module.exports = router;
