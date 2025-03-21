require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./src/routes");

mongoose.connect(process.env.MONGOOSE_URI);

const app = express();
const PORT = process.env.PORT || 3000;
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
