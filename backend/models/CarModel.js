var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarSchema = new Schema({
  model: String,
  firstRegistration: Number,
  img: String,
  registration: String,
  idOwner: String,
});

module.exports = mongoose.model("Car", CarSchema);
