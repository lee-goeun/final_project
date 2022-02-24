'use strict'

// 로그 값 찍어줄 곳 위치
const logger = require('../config/logger')
// DB 연동해주는 곳
const User = require('../models/User')

const output = {
  home: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`)
    // test용 메인페이지
    res.render('index')
  },

  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`)
    // test용 로그인 페이지
    res.render('login')
  },

  join: (req, res) => {
    logger.info(`GET /join 304 "회원가입 화면으로 이동"`)
    // test용 회원가입 페이지
    res.render('join')
  },
}

// api
const process = {
  // 로그인 기능
  // id, pw 확인
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login()

    const url = {
      method: 'POST',
      path: '/login',
      // error 처리
      status: response.err ? 400 : 200,
    }

    // object 만듦
    log(response, url)
    return res.status(url.status).json(response)
  },

  // 회원가입 기능
  // 저장
  join: async (req, res) => {
    const user = new User(req.body)
    const response = await user.join()

    // 조인 함수
    const url = {
      method: 'POST',
      path: '/join',
      // error 처리
      status: response.err ? 409 : 201,
    }

    // 회원가입에 실패한 경우
    log(response, url)
    return res.status(url.status).json(response)
  },
}

// 모듈
module.exports = {
  output,
  process,
}

// 로그 찍기
const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
    )
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${
        response.msg || ''
      }`
    )
  }
}
