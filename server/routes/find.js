const express = require('express');
// const findController = require('../controllers/find')
const router = express.Router();

router.post('/findId', findController.findId)
router.post('/findPw', findController.findPw)


module.exports = router;