const { User } = require("../../../models/user");
const { ApolloError } = require("apollo-server-express");

const authQueries = {
  getUser: async (parent, args, context, info) => {
    const { userId, isAuth } = context;
    try {
      if (!isAuth) {
        throw new ApolloError("Unauthenticated!");
      }
      const user = await User.findById(userId);
      return user;
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

module.exports = { authQueries };
