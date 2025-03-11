require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded.user; // Attach user to request
    next(); // Proceed to next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: "Invalid token. Access denied." });
  }
};

module.exports = authMiddleware;
