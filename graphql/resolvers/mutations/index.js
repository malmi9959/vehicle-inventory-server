const { authMutations } = require("./auth_mutations");
const { vehicleMutation } = require("./vehicle_mutation");

module.exports = {
  ...authMutations,
  ...vehicleMutation,
};
