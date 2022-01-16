const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  img: {
    type: String,
    trim: true
  }
});

module.exports =
  mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);
