const { ApolloError } = require("apollo-server-express");
const getNextSequenceValue = require("../../../helpers/getNextSequenceValue");
const { Counter } = require("../../../models/counter");
const { Vehicle } = require("../../../models/vehicle");

const vehicleQueries = {
  vehicles: async () => {
    try {
      const vehicles = await Vehicle.find().sort({ updatedAt: -1 });
      return vehicles;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  nextVehicleId: async () => {
    try {
      const vehicleId = await Counter.findOne({ _id: "vehicleId" });
      vehicleId.sequence_value++;
      const formatId = vehicleId.sequence_value.toString().padStart(3, "0");
      return `VID${formatId}`;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  vehicleById: async (_, args, context) => {
    try {
      const vehicle = Vehicle.findById(args.vehicleId);
      return vehicle;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

module.exports = { vehicleQueries };
