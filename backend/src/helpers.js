require("dotenv").config();
const jwt = require("jsonwebtoken");

const getSearchCondition = (req) => {
  const searchCondition = {};

  const searchQuery = req.query.search || "";
  const dateFilter = req.query.date || "";
  const locationFilter = req.query.location || "";
  const categoryFilter = req.query.category || "";

  // Search Query condition (if provided)
  if (searchQuery) {
    searchCondition.name = { $regex: searchQuery, $options: "i" };
  }

  // Date filter condition (if provided)
  if (dateFilter) {
    const startDate = new Date(dateFilter); // Convert the frontend date to a Date object
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    searchCondition.date = { $gte: startDate, $lt: endDate }; // You can modify this based on your date logic
  }

  // Location filter condition (if provided)
  if (locationFilter) {
    searchCondition.location = { $regex: locationFilter, $options: "i" }; // case-insensitive location match
  }

  // Category filter condition (if provided)
  if (categoryFilter) {
    searchCondition.category = { $regex: categoryFilter, $options: "i" }; // case-insensitive category match
  }

  return searchCondition;
};

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Short expiry
};

const generateRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  }); // Long expiry
};

module.exports = {
  getSearchCondition,
  generateAccessToken,
  generateRefreshToken,
};
