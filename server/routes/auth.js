var express = require('express');
var authController = require('../controllers/authController');
var router = express.Router();

router.post('/join', authController.join);
router.post('/login', authController.login);

// front에서 page연동
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/join', (req, res) => {
  res.render('join');
});
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
