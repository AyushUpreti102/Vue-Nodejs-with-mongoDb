const express = require("express");
const router = express.Router();

const eventsRoutes = require("./events");

router.use("/events", eventsRoutes);

module.exports = router;
