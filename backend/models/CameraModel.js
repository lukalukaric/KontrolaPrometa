var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CameraSchema = new Schema({
  id_camera: String,
  time: Date,
  gpsLocation: String,
  tk_user: String,
  tk_car: String,
});

module.exports = mongoose.model("Camera", CameraSchema);
