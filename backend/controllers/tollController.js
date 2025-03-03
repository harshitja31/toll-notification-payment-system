const Toll = require("../models/tollModel");
const axios = require("axios");

// @desc    Create a new toll
// @route   POST /api/tolls
// @access  Private (Admin only)
const createToll = async (req, res) => {
  const { name, latitude, longitude, price } = req.body;

  if (!name || !latitude || !longitude || !price) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const toll = new Toll({
    name,
    location: { latitude, longitude },
    price,
  });

  try {
    const savedToll = await toll.save();
    res.status(201).json(savedToll);
  } catch (error) {
    res.status(500).json({ message: "Error creating toll", error });
  }
};

// @desc    Get all tolls from Database
// @route   GET /api/tolls
// @access  Public
const getAllTolls = async (req, res) => {
  try {
    const tolls = await Toll.find();
    res.json(tolls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tolls", error });
  }
};

// @desc    Get single toll by ID
// @route   GET /api/tolls/:id
// @access  Public
const getTollById = async (req, res) => {
  try {
    const toll = await Toll.findById(req.params.id);
    if (!toll) return res.status(404).json({ message: "Toll not found" });
    res.json(toll);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toll", error });
  }
};

// @desc    Update toll details
// @route   PUT /api/tolls/:id
// @access  Private (Admin only)
const updateToll = async (req, res) => {
  try {
    const toll = await Toll.findById(req.params.id);
    if (!toll) return res.status(404).json({ message: "Toll not found" });

    const { name, latitude, longitude, price } = req.body;
    toll.name = name || toll.name;
    toll.location.latitude = latitude || toll.location.latitude;
    toll.location.longitude = longitude || toll.location.longitude;
    toll.price = price || toll.price;

    const updatedToll = await toll.save();
    res.json(updatedToll);
  } catch (error) {
    res.status(500).json({ message: "Error updating toll", error });
  }
};

// @desc    Delete a toll
// @route   DELETE /api/tolls/:id
// @access  Private (Admin only)
const deleteToll = async (req, res) => {
  try {
    const toll = await Toll.findById(req.params.id);
    if (!toll) return res.status(404).json({ message: "Toll not found" });

    await toll.deleteOne();
    res.json({ message: "Toll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting toll", error });
  }
};

// @desc    Get Nearby Tolls using OpenStreetMap API
// @route   GET /api/tolls/nearby
// @access  Public
const getNearbyTolls = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const overpassUrl = "https://overpass-api.de/api/interpreter";
    const query = `
      [out:json];
      node["highway"="toll_booth"](around:50000,${lat},${lon});
      out;
    `;

    const response = await axios.post(overpassUrl, `data=${encodeURIComponent(query)}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    res.json(response.data.elements);
  } catch (error) {
    console.error("Error fetching toll data:", error);
    res.status(500).json({ error: "Failed to fetch toll data" });
  }
};

module.exports = {
  createToll,
  getAllTolls,
  getTollById,
  updateToll,
  deleteToll,
  getNearbyTolls, // Added new API function
};
