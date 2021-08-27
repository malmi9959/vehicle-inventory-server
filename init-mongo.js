db = db.getSiblingDB("vehicle_inventory");
db.createUser({
  user: "wish9919",
  pwd: "Wish9919",
  roles: ["dbAdmin", "readWrite"],
});
db.createCollection("users");
