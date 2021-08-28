const { Counter } = require("../models/counter");

function getNextSequenceValue(sequenceName) {
  var sequenceDocument = Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true }
  );
  return sequenceDocument.sequence_value;
}

module.exports = getNextSequenceValue;
