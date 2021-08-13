const { TokenExpiredError } = require("jsonwebtoken");
var CarModel = require("../models/CarModel.js");
const jwt = require("jsonwebtoken");
var CarvideoModel = require("../models/CarVideoModel.js");

/**
 * CarController.js
 *
 * @description :: Server-side logic for managing Cars.
 */
module.exports = {
  /**
   * CarController.list()
   */
  list: function (req, res) {
    CarModel.find(function (err, Cars) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Car.",
          error: err,
        });
      }

      return res.json(Cars);
    });
  },
  listId: function (req, res) {
    var findeduser;

  
    CarvideoModel.find(function (err, CarVideos) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting CarVideo.",
          error: err,
        });
      }
      jwt.verify(req.body.token, process.env.TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        findeduser = user;
      });
      CarModel.find({ idOwner: findeduser.id }, function (err, Cars) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting Car.",
            error: err,
          });
        }
        console.log(CarVideos);
  
        return res.json({ Cars:Cars , CarVideos:CarVideos});
      });

    });

    
  },
  /**
   * CarController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    CarModel.findOne({ _id: id }, function (err, Car) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Car.",
          error: err,
        });
      }

      if (!Car) {
        return res.status(404).json({
          message: "No such Car",
        });
      }

      return res.json(Car);
    });
  },

  /**
   * CarController.create()
   */
  create: function (req, res) {
    const token = req.body.token;
    var findeduser;
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) return res.sendStatus(403);
      findeduser = user;
    });
    var Car = new CarModel({
      model: req.body.model,
      firstRegistration: req.body.registration,
      img: "images/" + req.file.filename,
      registration: req.body.registerNumber,
      idOwner: findeduser.id,
    });
    Car.save(function (err, Car) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Car",
          error: err,
        });
      }

      return res.status(201).json({ success: true });
    });
  },

  /**
   * CarController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CarModel.findOne({ _id: id }, function (err, Car) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Car",
          error: err,
        });
      }

      if (!Car) {
        return res.status(404).json({
          message: "No such Car",
        });
      }

      Car.save(function (err, Car) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Car.",
            error: err,
          });
        }

        return res.json(Car);
      });
    });
  },

  /**
   * CarController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    CarModel.findByIdAndRemove(id, function (err, Car) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Car.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
