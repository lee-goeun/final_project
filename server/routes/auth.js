var express = require('express');
var authController = require('../controllers/authController');
var router = express.Router();

// front에서 page연동
router.post('/join', authController.join);
router.post('/login', authController.login);
router.get('/auth', authController.auth);


module.exports = router;
