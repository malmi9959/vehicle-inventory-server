const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Upload
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
    fuel_usage: [FuelUsage]!
    createdAt: String
    updatedAt: String
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
    mileage: Int!
    last_service_date: String!
    service_period: Int!
    image: Upload!
  }
  input UpdateVehicleInput {
    reg_no: String
    type: String
    brand: String
    model: String
    owner_name: String
    owner_mobile: String
    owner_address: String
    condition: String
    mileage: Int
    last_service_date: String
    service_period: Int
    image: Upload
  }

  input FuelUsageInput {
    vehicleId: String!
    usage: Float!
  }

  type FuelUsage {
    _id: ID!
    year: Int
    month: Int
    usage: Float!
    vehicleId: String!
    createdAt: String
    updatedAt: String
  }

  enum UserType {
    ADMIN
    USER
  }

  type Subscription {
    fuelUsageCreated: FuelUsage
  }

  type Query {
    getUser: User!
    vehicles: [Vehicle!]
    vehicleById(vehicleId: String!): Vehicle!
    nextVehicleId: String
    fuelUsages(vehicleId: String): [FuelUsage]
  }

  type Mutation {
    addFuelUsage(input: FuelUsageInput!): FuelUsage
    addVehicle(input: VehicleInput!): Vehicle
    updateVehicle(id: String!, input: UpdateVehicleInput!): Vehicle
    login(email: String!, password: String!): AuthData
    createUser(userInput: UserInput): User
    deleteVehicle(id: String!): String
    updateUserById(updateUserInput: UpdateUserInput): User
  }
`;

module.exports = { typeDefs };
