const express = require('express');
const findController = require('../controllers/findController');
const router = express.Router();

// ID 찾기, PW 인증번호 발급, 인증번호를 이용해서 비밀번호 변경
router.post('/findId', findController.findId);
router.post('/findPw', findController.findPw);
router.post('/PwRe', findController.newPw);

module.exports = router;
