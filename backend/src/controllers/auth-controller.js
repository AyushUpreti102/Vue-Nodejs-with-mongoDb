const User = require("../models/users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../helpers");

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.json({ token, refreshToken });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
  fetchRefreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ msg: "Refresh token required" });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const newAccessToken = generateAccessToken(decoded.user);

      res.json({ token: newAccessToken });
    } catch (error) {
      return res.status(403).json({ msg: "Invalid or expired refresh token" });
    }
  }
}

module.exports = AuthController;
