const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.put('/userUpdate', userController.userUpdate);
router.put('/userDelete', userController.userDelete);

module.exports = router;
