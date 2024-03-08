const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const db = require("../util/database")

router.route("/").get( controllers.allusers);

module.exports = router;