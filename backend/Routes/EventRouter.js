const express = require("express");
const router = express.Router();
const { createEvent, fetchAllData, fetchSingleData } = require("../Controllers/eventController");

// Create a new event
router.post("/", createEvent);

// Get all events
router.get("/events", fetchAllData);

// Get a single event by ID
router.get("/event/:id", fetchSingleData);

module.exports = router;
