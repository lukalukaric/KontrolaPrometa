var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CarVideoSchema = new Schema({
  id_CarVideo: String,
  tablica: String,
  datum: Date,
  Latitude: Number,
  Longitude: Number,
});

module.exports = mongoose.model("carvideo", CarVideoSchema);
