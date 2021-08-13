var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
  id_video: String,
  videoLocation: String,
  time: Date,
  location: String,
  tk_user: String,
});

module.exports = mongoose.model("Video", VideoSchema);
