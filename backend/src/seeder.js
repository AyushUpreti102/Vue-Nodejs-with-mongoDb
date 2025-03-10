require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Event = require("./models/events-model");

const categories = [
  "Music Festivals",
  "Conferences & Seminars",
  "Sports Events",
  "Cultural Festivals",
  "Art Exhibitions",
  "Food & Drink Festivals",
  "Charity Events",
  "Weddings & Celebrations",
  "Trade Shows & Expos",
  "Theater & Performances",
];

const cities = [
  "New York City",
  "London",
  "Paris",
  "Tokyo",
  "Los Angeles",
  "Berlin",
  "Barcelona",
  "Sydney",
  "Dubai",
  "Rio de Janeiro",
];

// Generate fake events
const generateFakeEvents = (count) => {
  return Array.from({ length: count }, () => ({
    name: faker.company.name(),
    description: faker.lorem.sentences(3),
    date: faker.date.future(),
    location: faker.helpers.arrayElement(cities),
    image: faker.image.urlPicsumPhotos(), // Random image URL
    max_allowed: faker.number.int({ min: 50, max: 500 }),
    timing: `${faker.number.int({
      min: 1,
      max: 12,
    })}:00 ${faker.helpers.arrayElement(["AM", "PM"])}`,
    category: faker.helpers.arrayElement(categories),
  }));
};

// Seed database
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Event.deleteMany();
    console.log("Existing data cleared");

    // Insert new fake data
    const events = generateFakeEvents(50); // Generates 50 users
    await Event.insertMany(events);
    console.log("Fake users inserted successfully");

    // Disconnect
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
