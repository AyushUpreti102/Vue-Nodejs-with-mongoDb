const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const eventsRoutes = require("./events");

router.use("/auth", authRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
