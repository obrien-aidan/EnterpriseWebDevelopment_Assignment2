require("dotenv").config();
//This file is for Database Connectivity and Calling of DB functions

//Mongoose is an Object Oriented Modelling tool for MongoDB
const Mongoose = require("mongoose");

//Use these to avoid from Warnings
Mongoose.set("useNewUrlParser", true);
Mongoose.set("useUnifiedTopology", true);

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on("error", function(err) {
  console.log(`database connection error: ${err}`);
});

db.on("disconnected", function() {
  console.log("database disconnected");
});

//Importing Data
async function seed() {
  var seeder = require("mais-mongoose-seeder")(Mongoose);
  const data = require("./seed-data.json");
  const Island = require("./islands");
  const User = require("./user");
  const dbData = await seeder.seed(data, {
    dropDatabase: false,
    dropCollections: true,
  });
  console.log(dbData);
}

db.once("open", function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  seed();
});
