const { pubsub } = require("../../../helpers/pubSub");

const fuelUsageSubscription = {
  fuelUsageCreated: {
    subscribe: () => pubsub.asyncIterator(["FUEL_USAGE_CREATED"]),
  },
};

module.exports = { fuelUsageSubscription };
