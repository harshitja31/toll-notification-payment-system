const express = require("express");
const router = express.Router();
const { 
  createToll, 
  getAllTolls, 
  getTollById, 
  updateToll, 
  deleteToll, 
  getNearbyTolls 
} = require("../controllers/tollController");

// Place the nearby tolls route **before** the getTollById route
router.get("/nearby", getNearbyTolls);
router.get("/", getAllTolls);
router.post("/", createToll);
router.get("/:id", getTollById);
router.put("/:id", updateToll);
router.delete("/:id", deleteToll);

module.exports = router;