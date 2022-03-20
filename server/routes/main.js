const express = require('express');
const authController = require('../controllers/mainController');
const router = express.Router();

router.get('/likeQuick', authController.likeQuick);
router.get('/viewQuick', authController.viewQuick);
router.get('/favoritesQuick', authController.favoritesQuick);

module.exports = router;
