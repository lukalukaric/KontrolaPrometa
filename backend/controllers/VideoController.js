var VideoModel = require('../models/VideoModel.js');

/**
 * VideoController.js
 *
 * @description :: Server-side logic for managing Videos.
 */
module.exports = {

    /**
     * VideoController.list()
     */
    list: function (req, res) {
        VideoModel.find(function (err, Videos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Video.',
                    error: err
                });
            }

            return res.json(Videos);
        });
    },

    /**
     * VideoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        VideoModel.findOne({_id: id}, function (err, Video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Video.',
                    error: err
                });
            }

            if (!Video) {
                return res.status(404).json({
                    message: 'No such Video'
                });
            }

            return res.json(Video);
        });
    },

    /**
     * VideoController.create()
     */
    create: function (req, res) {
        var Video = new VideoModel({
			id_video : req.body.id_video,
			videoLocation : req.body.videoLocation,
			time : req.body.time,
			location : req.body.location,
			tk_user : req.body.tk_user
        });

        Video.save(function (err, Video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Video',
                    error: err
                });
            }

            return res.status(201).json(Video);
        });
    },

    /**
     * VideoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        VideoModel.findOne({_id: id}, function (err, Video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Video',
                    error: err
                });
            }

            if (!Video) {
                return res.status(404).json({
                    message: 'No such Video'
                });
            }

            Video.id_video = req.body.id_video ? req.body.id_video : Video.id_video;
			Video.videoLocation = req.body.videoLocation ? req.body.videoLocation : Video.videoLocation;
			Video.time = req.body.time ? req.body.time : Video.time;
			Video.location = req.body.location ? req.body.location : Video.location;
			Video.tk_user = req.body.tk_user ? req.body.tk_user : Video.tk_user;
			
            Video.save(function (err, Video) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Video.',
                        error: err
                    });
                }

                return res.json(Video);
            });
        });
    },

    /**
     * VideoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        VideoModel.findByIdAndRemove(id, function (err, Video) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Video.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
