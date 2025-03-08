const express = require("express");
const router = express.Router();

const Event = require("../models/events-model");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const events = await Event.find().skip(skip).limit(limit);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/add", async (req, res) => {
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    location: req.body.location,
    image: req.body.image,
    max_allowed: req.body.max_allowed,
    timing: req.body.timing,
    category: req.body.category,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    event.name = req.body.name;
    event.description = req.body.description;
    event.date = req.body.date;
    event.location = req.body.location;
    event.image = req.body.image;
    event.max_allowed = req.body.max_allowed;
    event.timing = req.body.timing;
    event.category = req.body.category;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
