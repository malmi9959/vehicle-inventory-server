const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { connect } = require("mongoose");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");

const app = express();

require("dotenv").config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

// TODO add middleware
// app.use(middlewares);

let server;

const connectDB = async () => {
  await connect(`${DATABASE_URL}`, {
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("MongodDB Connected Successfully"))
    .catch((err) => console.error(err));
};

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      userId: req.userId,
      isAuth: req.isAuth,
    }),
  });

  await server.start();
  await server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log("Server Running on " + `http://localhost:${PORT}`);
    console.log(
      `GraphQL path is  http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

connectDB()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;