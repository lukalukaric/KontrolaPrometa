var express = require("express");
var router = express.Router();
var CameraController = require("../controllers/CameraController.js");
var multer = require("multer");
var upload = multer({ dest: "public/images/" });
/*
 * GET
 */
router.get("/", CameraController.list);

/*
 * GET
 */
router.get("/:id", CameraController.show);

/*
 * POST
 */
router.post("/", upload.single("slika"), CameraController.create);

/*
 * PUT
 */
router.put("/:id", CameraController.update);

/*
 * DELETE
 */
router.delete("/:id", CameraController.remove);

module.exports = router;
