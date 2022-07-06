const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// front에서 page연동
router.post('/login', authController.login);
router.get('/auth', authController.auth);
router.post('/join', authController.join);
router.post('/join/idCheck', authController.idCheck);
router.post('/join/nickCheck', authController.ncikCheck);
router.post('/join/emailCheck', authController.emailCheck);

// 로그인 한 경우 -> 쿠키 값
module.exports = router;
