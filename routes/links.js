const express = require("express");
const router = express.Router();
const LinksController = require("../controllers/links");

router.post("/", LinksController.links_get_all);

module.exports = router;
