const path = require("path");

require("dotenv").config();

const { Seeder } = require("mongo-seeding");

const { DATABASE_URL } = process.env;

const config = {
  database: DATABASE_URL,
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(
  path.resolve("./data/collections")
);

seeder
  .import(collections)
  .then(() => {
    // Do whatever you want after successful import
    console.log("Database Seeded Successfully ✅");
  })
  .catch((err) => {
    // Handle errors
    console.log(err);
  });
