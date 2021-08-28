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
  type Vehicle {
    _id: String!
    reg_no: String!
    type: String
    brand: String
    model: String
    owner_name: String
    owner_mobile: String
    owner_address: String
    condition: String
    mileage: Float!
    last_service_date: String!
    service_period: Int!
    image: String!
    last_month_fuel_usage: Float!
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

  input VehicleInput {
    reg_no: String!
    type: String
    brand: String
    model: String
    owner_name: String
    owner_mobile: String
    owner_address: String
    condition: String
    mileage: Float!
    last_service_date: String!
    service_period: Int!
    image: String!
    last_month_fuel_usage: Float!
  }

  enum UserType {
    ADMIN
    USER
  }

  type Query {
    getUser: User!
    vehicles: [Vehicle!]
    vehicleById: Vehicle!
  }

  type Mutation {
    addVehicle(input: VehicleInput!): Vehicle
    login(email: String!, password: String!): AuthData
    createUser(userInput: UserInput): User
    updateUserById(updateUserInput: UpdateUserInput): User
  }
`;

module.exports = { typeDefs };
