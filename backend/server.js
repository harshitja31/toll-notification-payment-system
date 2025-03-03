require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const tollRoutes = require('./routes/tollRoutes');
const paymentRoutes = require("./routes/paymentRoutes");


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log requests

// Routes
app.use("/api/users", userRoutes);
app.use('/api/tolls', tollRoutes);
app.use("/api/payment", paymentRoutes);


// Health Check Route
app.get("/", (req, res) => {
  res.send({ message: "API is running..." });
});

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
