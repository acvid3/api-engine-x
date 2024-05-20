// src/routes/translation-routes.js
const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translation-controller');

router.get('/', translationController.translateText);

module.exports = router;
