const queries = require("./queries");
const mutations = require("./mutations");
const subscriptions = require("./subscriptions");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Upload: GraphQLUpload,
  Query: { ...queries },
  Mutation: { ...mutations },
  Subscription: { ...subscriptions },
};

module.exports = { resolvers };
