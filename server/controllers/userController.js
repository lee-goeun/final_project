const mysql = require('mysql');
const multer = require('multer')
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const jwt = require('jsonwebtoken');
const { cache } = require('ejs');

// user profile 사진 업로드 창
const upload = multer({ dest: 'profile/'})


exports.userProfile = async (req, res) => {
  try{
  
  console.log('test code');
  console.log(req.body);

  // 계정이 없는 경우 에러처리 및 내용 확인
  param('userId', async (req, res, next, value) => {
    try {
      // @ts-ignore
      const userId = USERS[value]

      if (!userId) {
        const err = new Error('사용자가 존재하지 않습니다.')
        err.statusCode = 404
        throw err
      }
      // @ts-ignore
      req.userId = userId
      next()
    } catch (err) {
      next(err)
    }
  })

  // 이미지 라인 uploads -> url 해시링크 걸어주는 곳
  get('/:id', (req, res) => {
    const resMimeType = req.accepts(['json', 'html'])

    if (resMimeType === 'json') {
      //@ts-ignore
      res.send(req.userId)
    } else if (resMimeType === 'html') {
      res.render('user-profile', {
        nickname: req.user.nickname,
        userId: req.params.id,
        // DB 연동할 때 url값 링크 걸어줘야 하는 부분 링크값 변수에 저장해서 넣어주기
        profileImageURL: '/profile/',
      })
    }
  })

  // 계정 닉네임
  post('/:userId/userNick', (req, res) => {
    // @ts-ignore
    const { userId } = req
    const { userNick } = req.body

    userId.userNick = userNick

    res.send(`User updated: ${userNick}`)
  })

  // 프로필 사진 업로드
  post('/:userId/profile', upload.single('profile'), (req, res, next) => {
    const { userId } = req
    const { filename } = req.file
    userId.profileImage = filename

    res.send('User profile image uploaded.')
  })


  }catch(err){
    console.log(err)
  }
}




exports.update = async (req, res) => {
  try{
    console.log(req.body);


  }
  catch(err){
    console.log(err)
  }
}

exports.del = async (req, res) => {
  try{
    console.log(req.body);

    
  }
  catch(err){
    console.log(err)
  }
}