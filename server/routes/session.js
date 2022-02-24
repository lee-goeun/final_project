'use stirct'

// 세션 관리 라우터 수정중입니다 라우터에서 컨트롤러로 넘어갈 예정입니다

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.use(
  session({
    secret: '123!45%Q$WE#AS@D159@',
    resave: false,
    // true가 권장값
    saveUninitialized: true,
  })
)

router.get('/', (req, res) => {
  if (req.session.count) {
    req.session.count++
  } else {
    req.session.count = 1
  }

  res.send('hi session')
})

login
router.post('/', (req, res) => {
  // test id 코드
  const user = {
    username: 'egoing',
    password: 111,
    // displayName: 'Egoing',
  }
  const user_id = req.body.user_id
  const user_pw = req.body.user_pw

  if (user_id === user.username && user_pw === user.password) {
    // res.redirect('/')
    // res.session.displayName = user.displayName
    res.send('Yes')
  } else {
    res.send('who are you?')
  }
})

module.exports = router
