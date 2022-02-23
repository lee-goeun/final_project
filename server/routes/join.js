'use stirct'
// 회원가입 routers

const bodyParser = require('body-parser')

const db = require('../config/mysql')

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('join')
})

router.post('/join/register', (req, res) => {
  console.log('회원가입')
})

module.exports = router

// bcrypt를 이용한 비밀번호 암호화는 조금 더 보기
// // 비밀번호 암호화로 인한 추가 코드
// const bcrpy = require('bcrypt')
// const saltRounds = 10

// router.post('/register', (req, res, next) => {
//   const param = [req.body.id, req.body.pw, req.body.name]

//   bcrpy.hash(param[1], saltRounds, (error, hash) => {
//     param[1] = hash

//     db.query(
//       // 쿼리
//       'INSERT INTO member(`id`,`pw`,name`) VALUES (?,?,?)',
//       param,
//       (err, row) => {
//         if (err) console.log(err)
//       }
//     )
//   })
//   res.end()
// })

// router.get('/', (req, res) => {
//   res.render('register')
// })
// 날려놓은 부분
// --
// --
// test용  회원가입 라우팅 함
// router.route('/join/UserAdd').post((req, res) => {
//   const paramID = req.body.user_id || req.query.user_id
//   const paramPW = req.body.user_pw || req.query.user_pw
//   const paramName = req.body.user_name || req.query.user_name
//   const paramNick = req.body.user_nick || req.query.user_nick
//   const paramPhone = req.body.user_phone || req.query.user_phone

//   // 유저 등록
//   UserAdd(paramID, paramName, paramPW, paramNick, paramPhone, (err, result) => {
//     // DB 연결에 에러발생
//     if (err) {
//       console.log('중복입니다.')
//       res.end()
//       return
//     }
//     // 저장됨
//     if (result) {
//       console.dir(result)
//       res.write('정보가 등록됐습니다.')
//       res.end()
//     } else {
//       console.log('정보 저장 에러입니다.')
//       res.end()
//     }
//   })
// })

// // 값 추가
// const UserAdd = (
//   user_id,
//   user_name,
//   user_pw,
//   user_nick,
//   user_phone,
//   callback
// ) => {
//   const data = {
//     user_id: user_id,
//     user_name: user_name,
//     user_pw: user_pw,
//     user_nick: user_nick,
//     user_phone: user_phone,
//   }

//   //usertbl 테이블에 데이터 값 추가
//   const exec = db.query('INSERT INTO usertbl SET ?', data, (err, result) => {
//     db.release()
//     console.log('실행된 SQL : ' + exec.sql)

//     if (err) {
//       console.log('sql 실행 시 에러 발생')
//       callback(err, null)
//       return
//     }
//     callback(null, result)
//   })
// }
