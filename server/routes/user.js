const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// 임시 page 이름입니다 테스트용 이름입니다 변경해주시면 됩니다.
router.post('/userView', userController.userView);
router.post('/up-user', userController.userUpdate);
router.post('/del-user', userController.userDelete);

module.exports = router;
