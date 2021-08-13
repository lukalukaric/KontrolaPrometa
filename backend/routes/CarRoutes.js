var express = require("express");
var router = express.Router();
var CarController = require("../controllers/CarController.js");
var multer = require("multer");
var upload = multer({ dest: "public/images/" });
/*
 * GET
 */
router.get("/", CarController.list);

/*
 * GET
 */
router.get("/:id", CarController.show);

/*
 * POST
 */
router.post("/get", upload.single("slika"), CarController.listId);

router.post("/", upload.single("slika"), CarController.create);

/*
 * PUT
 */
router.put("/:id", CarController.update);

/*
 * DELETE
 */
router.delete("/:id", CarController.remove);

module.exports = router;
