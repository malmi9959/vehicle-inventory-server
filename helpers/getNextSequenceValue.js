const { ApolloError } = require("apollo-server-express");
const { Counter } = require("../models/counter");

async function getNextSequenceValue(sequenceName) {
  let vehicleId;
  var sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true }
  );
  const formatId = sequenceDocument.sequence_value.toString().padStart(3, "0");
  vehicleId = `VID${formatId}`;
  return vehicleId;
}

module.exports = getNextSequenceValue;
