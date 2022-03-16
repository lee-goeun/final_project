const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// front에서 page연동
router.post('/login', authController.login);
router.get('/auth', authController.auth);
router.post('/join', authController.join);

// id, nick, email
// 로그인 한 경우 -> 쿠키 값
module.exports = router;
