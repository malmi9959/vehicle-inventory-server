const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const counter = new Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    required: true,
  },
});

const Counter = mongoose.model("Counter", counter);
module.exports = { Counter };
