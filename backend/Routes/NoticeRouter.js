const express = require("express");
const router = express.Router();
const { createNotice, fetchAllData, fetchSingleData } = require("../Controllers/NoticeController");

// Create a new event
router.post("/", createNotice);

// Get all events
router.get("/notices", fetchAllData);

// Get a single event by ID
router.get("/notice/:id", fetchSingleData);

module.exports = router;