const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    trim: true
  },
  distance: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    trim: true
  }
});

module.exports =
  mongoose.models.Location || mongoose.model("Location", locationSchema);
