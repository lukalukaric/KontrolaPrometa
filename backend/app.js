var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var mongoDB =
  "mongodb+srv://Ziga:123@kontrolaprometa.y3yve.mongodb.net/KontrolaPrometa";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

var indexRouter = require("./routes/index");

var usersRouter = require("./routes/UserRoutes");
var cameraRouter = require("./routes/CameraRoutes");
var carRouter = require("./routes/CarRoutes");
var videoRouter = require("./routes/VideoRoutes");
var carVideoRouter = require("./routes/CarVideoRoutes");
var cors = require("cors");

var app = express();
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/camera", cameraRouter);
app.use("/cars", carRouter);
app.use("/videos", videoRouter);
app.use("/carimage", carVideoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

