var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const { interval } = require("rxjs");
var UserSchema = new Schema({
  id_user: String,
  name: String,
  lastname: String,
  age: Number,
  email: String,
  password: String,
});

UserSchema.statics.authenticate = function (name, password, callback) {
  User.findOne({ name: name }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
