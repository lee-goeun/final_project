'use stirct'
// 로그인 라우터에서 테스트 코드 모두 끝나면 컨트롤러로 분리해서 보기
// const ctrl = require('../controller/LoginController')

// express
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res) => {
  res.render('login')
})

// login
router.get('/', (req, res) => {
  // test id 코드
  const user = {
    username: 'jjo',
    pws: 123,
    displayName: 'jo',
  }
  const user_id = req.body.user_id
  const user_pw = req.body.user_pw

  // 연산자에서 문제가 발생함.
  // ==랑 ===의 차이는 덜 엄격함과 엄격함을 갖고 있는다.
  // 이 엄격함에 대해서 공부하고 작성하기
  if (user_id === user.username && user_pw == user.pws) {
    // 출력 이름 갖고 오는 부분
    res.session.displayName = user.displayName
    res.redirect('/test')
  } else {
    res.send('who are you?')
  }
})

router.post('/test', (req, res) => {
  if (req.session.displayName) {
    res.send(`
    <h1>hello tset ,${req.session.displayName}</h1>
    `)
  } else {
    res.send(
      `<h1>로그인 실패 </h1>
    <a href="/login> test</a>`
    )
  }
})

router.get('/logout', (req, res) => {
  delete req.session.displayName
  res.redirect('/login')
})

module.exports = router

//
//
//
// 날려놓은 부분
//
//
//

// 로그인 파트
// router.route('/Login').post((req, res) => {
//   const paramID = req.body.user_id || req.query.user_id
//   const paramPW = req.body.user_pw || req.query.user_pw

//   UserAuth(paramID, paramPW, (err, rows) => {
//     if (err) {
//       console.log('에러가 발생했습니다.')
//       res.end()
//       return
//     }

//     if (rows) {
//       console.dir(rows)
//       res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
//       res.write('로그인에 성공하셨습니다.')
//       res.end()
//     } else {
//       console.log('로그인에 실패하셨습니다.')
//       res.end()
//     }
//   })
// })

// // 로그인 -> DB 인증
// const UserAuth = (user_id, user_pw, callback) => {
//   const tablename = 'usertbl'
//   const columns = ['id', 'name', 'nick', 'phone']

//   //id 와 pw 가 같은 것을 조회한다
//   const exec = db.query(
//     'SELECT * FROM * WHERE id = ? AND passwords=?',
//     [columns, tablename, user_id, user_pw],

//     (err, rows) => {
//       console.log('실행된 ssql : ' + exec.sql)

//       if (err) {
//         callback(err, null)
//         return
//       }

//       if (rows.length > 0) {
//         console.log('사용자 찾음')
//         callback(null, rows)
//       } else {
//         console.log('사용자를 찾지 못함')
//         callback(null, null)
//       }
//     }
//   )
// }

// router.get('/login', ctrl.m)

// login 모듈화 빼놓은거 날려놓은 것

// router.get('/', ctrl.login)
// router.post('/login', ctrl.login)

// // 쿠키값
// router.use(
//   session({
//     secret: '123!45%Q$WE#AS@D159@',
//     resave: false,
//     // true가 권장값
//     saveUninitialized: true,
//   })
// )
// // 쿠키 카운팅
// router.get('/count', (req, res) => {
//   if (req.session.count) {
//     req.session.count++
//   } else {
//     req.session.count = 1
//   }

//   res.send('hi session')
// })
