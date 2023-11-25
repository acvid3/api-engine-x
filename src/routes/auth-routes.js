const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/generate-token", authController.generateToken);

module.exports = router;
