const { ApolloError } = require("apollo-server-express");

const { Counter } = require("../../../models/counter");
const { Vehicle } = require("../../../models/vehicle");

const vehicleMutation = {
  addVehicle: async (_, args, context) => {
    const {
      reg_no,
      type,
      brand,
      model,
      owner_name,
      owner_mobile,
      owner_address,
      condition,
      mileage,
      last_service_date,
      service_period,
      image,
      last_month_fuel_usage,
    } = args.input;
    const { userId, isAuth } = context;
    try {
      if (!isAuth) {
        throw new ApolloError("Unauthenticated!");
      }

      let _id;
      var sequenceDocument = await Counter.findOneAndUpdate(
        { _id: "vehicleId" },
        { $inc: { sequence_value: 1 } },
        { new: true }
      );
      const seq_pos = sequenceDocument.sequence_value;
      let long_id = seq_pos.toString().padStart(3, "0");
      _id = `VH${long_id}`;

      const vehicle = new Vehicle({
        _id: _id,
        reg_no,
        type,
        brand,
        model,
        owner_name,
        owner_mobile,
        owner_address,
        condition,
        mileage,
        last_service_date,
        service_period,
        image,
        last_month_fuel_usage,
      });

      const result = await vehicle.save();

      return result;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

module.exports = { vehicleMutation };
