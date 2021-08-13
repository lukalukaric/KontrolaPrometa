var CarvideoModel = require("../models/CarVideoModel.js");

/**
 * CarVideoController.js
 *
 * @description :: Server-side logic for managing CarVideos.
 */
module.exports = {
  /**
   * CarVideoController.list()
   */
  list: function (req, res) {
    CarvideoModel.find(function (err, CarVideos) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting CarVideo.",
          error: err,
        });
      }

      return res.json(CarVideos);
    });
  },

  /**
   * CarVideoController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    CarvideoModel.findOne({ _id: id }, function (err, CarVideo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting CarVideo.",
          error: err,
        });
      }

      if (!CarVideo) {
        return res.status(404).json({
          message: "No such CarVideo",
        });
      }

      return res.json(CarVideo);
    });
  },

  /**
   * CarVideoController.create()
   */
  create: function (req, res) {
    var CarVideo = new CarvideoModel({
      id_CarVideo: req.body.id_CarVideo,
      numberOfCars: req.body.numberOfCars,
      tk_car: req.body.tk_car,
      tk_video: req.body.tk_video,
    });

    CarVideo.save(function (err, CarVideo) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating CarVideo",
          error: err,
        });
      }

      return res.status(201).json(CarVideo);
    });
  },

  /**
   * CarVideoController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    CarvideoModel.findOne({ _id: id }, function (err, CarVideo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting CarVideo",
          error: err,
        });
      }

      if (!CarVideo) {
        return res.status(404).json({
          message: "No such CarVideo",
        });
      }

      CarVideo.id_CarVideo = req.body.id_CarVideo
        ? req.body.id_CarVideo
        : CarVideo.id_CarVideo;
      CarVideo.numberOfCars = req.body.numberOfCars
        ? req.body.numberOfCars
        : CarVideo.numberOfCars;
      CarVideo.tk_car = req.body.tk_car ? req.body.tk_car : CarVideo.tk_car;
      CarVideo.tk_video = req.body.tk_video
        ? req.body.tk_video
        : CarVideo.tk_video;

      CarVideo.save(function (err, CarVideo) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating CarVideo.",
            error: err,
          });
        }

        return res.json(CarVideo);
      });
    });
  },

  /**
   * CarVideoController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    CarvideoModel.findByIdAndRemove(id, function (err, CarVideo) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the CarVideo.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
