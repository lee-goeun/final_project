'use strict'

const express = require('express')
const router = express.Router()

const ctrl = require('../controller/signController')

router.get('/', ctrl.output.home)
router.get('/login', ctrl.output.login)
router.get('/join', ctrl.output.join)

router.post('/login', ctrl.process.login)
router.post('/join', ctrl.process.join)

module.exports = router
