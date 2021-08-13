var express = require("express");
var router = express.Router();
var UserController = require("../controllers/UserController.js");
var multer = require("multer");
const User = require("../models/UserModel.js");
var upload = multer({ dest: "public/images/" });
/*
 * GET
 */
router.get("/", UserController.scraperFunction);

/*
 * GET
 */
router.get("/:id", UserController.findUserByToken);
router.get("/scraper", UserController.scraperFunction);
/*
 * POST
 */
router.post("/", upload.single("slika"), UserController.create);
router.post("/login", upload.single("slika"), UserController.show);
//router.post("/login", upload.single("slika"), AuthorizationVerify, UserController.show);

/*
 * PUT
 */
router.put("/:id", UserController.update);

/*
 * DELETE
 */
router.delete("/:id", UserController.remove);

module.exports = router;
