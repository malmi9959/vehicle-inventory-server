const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    reg_no: {
      type: String,
    },
    brand: {
      type: "String",
    },
    type: {
      type: "String",
    },
    model: {
      type: "String",
    },
    condition: {
      type: "String",
    },
    image: {
      type: "String",
    },
    fuel_usage: {
      type: [
        {
          updatedAt: {
            type: String,
          },
          month: {
            type: "Number",
          },
          year: {
            type: "Number",
          },
          usage: {
            type: "Number",
          },
        },
      ],
      default: [],
    },
    last_service_date: {
      type: "Date",
    },
    mileage: {
      type: "Number",
    },
    owner_address: {
      type: "Mixed",
    },
    owner_mobile: {
      type: "String",
    },
    owner_name: {
      type: "String",
    },
    service_period: {
      type: "Number",
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = { Vehicle };
