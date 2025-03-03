const mongoose = require('mongoose');

const tollSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  price: { type: Number, required: true },
});

const Toll = mongoose.model('Toll', tollSchema);
module.exports = Toll;
