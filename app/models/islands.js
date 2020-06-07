const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

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
