const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  reg_no: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  owner_name: {
    type: String,
  },
  owner_mobile: {
    type: String,
  },
  owner_address: {
    type: String,
  },
  condition: {
    type: String,
  },
  mileage: {
    type: Number,
    required: true,
  },
  last_service_date: {
    type: String,
    required: true,
  },
  service_period: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  last_month_fuel_usage: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = { Vehicle };
