const { authQueries } = require("./auth_queries");
const { vehicleQueries } = require("./vehicleQueries");

module.exports = {
  ...authQueries,
  ...vehicleQueries,
};
