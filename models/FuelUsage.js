const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fuelUsageSchema = new Schema(
  {
    vehicleId: {
      type: String,
    },
    updatedAt: {
      type: String,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    usage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const FuelUsage = mongoose.model("FuelUsage", fuelUsageSchema);
module.exports = { FuelUsage };
