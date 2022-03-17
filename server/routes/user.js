const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/userUpdate', userController.userUpdate);
router.delete('/userDelete', userController.userDelete);

module.exports = router;
