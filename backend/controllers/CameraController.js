var CameraModel = require("../models/CameraModel.js");

/**
 * CameraController.js
 *
 * @description :: Server-side logic for managing Cameras.
 */
module.exports = {
  /**
   * CameraController.list()
   */
  list: function (req, res) {
    CameraModel.find(function (err, Cameras) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Camera.",
          error: err,
        });
      }

      return res.json(Cameras);
    });
  },

  /**
   * CameraController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    CameraModel.findOne({ _id: id }, function (err, Camera) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Camera.",
          error: err,
        });
      }

      if (!Camera) {
        return res.status(404).json({
          message: "No such Camera",
        });
      }

      return res.json(Camera);
    });
  },

  /**
   * CameraController.create()
   */
  create: function (req, res) {
    var Camera = new CameraModel({
      id_camera: "0", //req.body.id_camera,
      time: "0", //req.body.time,
      gpsLocation: "0", //req.body.gpsLocation,
      tk_user: "0", //req.body.tk_user,
      tk_car: "0", //req.body.tk_car
    });

    Camera.save(function (err, Camera) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Camera",
          error: err,
        });
      }

      return res.status(201).json(Camera);
    });
  },

  /**
   * CameraController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CameraModel.findOne({ _id: id }, function (err, Camera) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Camera",
          error: err,
        });
      }

      if (!Camera) {
        return res.status(404).json({
          message: "No such Camera",
        });
      }

      Camera.id_camera = req.body.id_camera
        ? req.body.id_camera
        : Camera.id_camera;
      Camera.time = req.body.time ? req.body.time : Camera.time;
      Camera.gpsLocation = req.body.gpsLocation
        ? req.body.gpsLocation
        : Camera.gpsLocation;
      Camera.tk_user = req.body.tk_user ? req.body.tk_user : Camera.tk_user;
      Camera.tk_car = req.body.tk_car ? req.body.tk_car : Camera.tk_car;

      Camera.save(function (err, Camera) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Camera.",
            error: err,
          });
        }

        return res.json(Camera);
      });
    });
  },

  /**
   * CameraController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    CameraModel.findByIdAndRemove(id, function (err, Camera) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Camera.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
