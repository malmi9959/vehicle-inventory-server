require("dotenv").config();
const { User } = require("../../../models/user");
const { ApolloError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const authMutations = {
  login: async (parent, args, context, info) => {
    const { email, password } = args;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new ApolloError("User does not exist!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new ApolloError("Password is incorrect");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      return {
        userId: user.id,
        token: token,
        tokenExpiration: 60 * 60 * 1000,
        type: user.type,
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  createUser: async (parent, args, context, info) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new ApolloError("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        username: args.userInput.username,
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: hashedPassword,
        type: args.userInput.type,
        phone: args.userInput.phone,
        address: args.userInput.address,
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: null,
        _id: result.id,
        type: result.type,
      };
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { authMutations };
