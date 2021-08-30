const queries = require("./queries");
const mutations = require("./mutations");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Upload: GraphQLUpload,
  Query: { ...queries },
  Mutation: { ...mutations },
};

module.exports = { resolvers };
