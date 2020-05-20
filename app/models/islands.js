const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

//Defination of Add Island Schema for respective user
const islandsSchema = new Schema({
  name: String,
  provence: String,
  description: String,
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Islands", islandsSchema);
