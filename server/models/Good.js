const mongoose = require("mongoose");

const GoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  count: {
    type: Number,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model("Good", GoodSchema);
