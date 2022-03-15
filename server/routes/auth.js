const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// front에서 page연동
router.post('/login', authController.login);
router.get('/auth', authController.auth);
router.post('/join', authController.join);

// 프론트에서 값을 입력 받았을 때 제대로 된 값이 입력되면 패스 베스트 <- .com ac.kr.. ~ .
// 백에서 값을 입력 받았는데 공백이 있으면 에러 리턴 <-반복 <- 값이 @naver~
// id, nick, email
// 로그인 한 경우 -> 쿠키 값
module.exports = router;
