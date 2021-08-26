const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String
    type: String
    phone: String!
    address: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    type: String
  }

  input UpdateUserInput {
    username: String
    email: String
    firstName: String
    lastName: String
    phone: String
    address: String
  }

  input UserInput {
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    type: UserType!
    phone: String!
    address: String
  }

  enum UserType {
    ADMIN
    USER
  }

  type Query {
    getUser: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthData
    createUser(userInput: UserInput): User
    updateUserById(updateUserInput: UpdateUserInput): User
  }
`;

module.exports = { typeDefs };
