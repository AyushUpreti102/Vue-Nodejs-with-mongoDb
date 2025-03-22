const express = require("express");
const EventController = require("../controllers/event-controller");
const authMiddleware = require("../authMiddleware");
const { mapControllerFunction } = require("../helpers");

const router = express.Router();

router.use(authMiddleware);

// Events Route
router.get("/", mapControllerFunction(EventController, "getEvents"));
// Event Route
router.get("/:id", mapControllerFunction(EventController, "getEventById"));
// Create Route
router.post("/add", mapControllerFunction(EventController, "createEvent"));
// Edit Route
router.put("/edit/:id", mapControllerFunction(EventController, "editEvent"));

module.exports = router;
