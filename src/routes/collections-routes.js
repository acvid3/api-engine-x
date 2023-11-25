const express = require("express");
const collectionsController = require("../controllers/collections-controller");
const router = express.Router();

router.get("/get-collections", collectionsController.fetchCollections);

module.exports = router;
