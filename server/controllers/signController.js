'use strict'

// const logger = require('../config/logger')
const User = require('../models/User')

const output = {
  // main page받았을 때 <- render만 임의로 해놓은 것입니다.
  main: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`)
    res.render('/main')
  },

  // 로그인 render 위치 조정
  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`)
    res.render('/login')
  },

  // join 위치조정
  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`)
    res.render('/join')
  },
}

const process = {
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login()

    const url = {
      method: 'POST',
      path: '/login',
      status: response.err ? 400 : 200,
    }

    log(response, url)
    return res.status(url.status).json(response)
  },

  register: async (req, res) => {
    const user = new User(req.body)
    const response = await user.register()

    const url = {
      method: 'POST',
      path: '/join',
      status: response.err ? 409 : 201,
    }

    log(response, url)
    return res.status(url.status).json(response)
  },
}

module.exports = {
  output,
  process,
}
