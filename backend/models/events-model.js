const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  max_allowed: Number,
  timing: String,
  category: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
