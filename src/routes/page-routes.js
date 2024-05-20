// src/routes/page-routes.js
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page-controller');

router.get('/fetch-page', pageController.fetchPageContent);

module.exports = router;
