require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect(process.env.MONGOOSE_URI);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("connected");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
