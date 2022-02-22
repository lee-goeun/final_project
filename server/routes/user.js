// @ts-check
const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })

const router = express.Router()

//test용 id
const USERS = {
  15: {
    nickname: 'foo',
    profileImage: undefined,
  },
  16: {
    nickname: 'bar',
    profileImage: undefined,
  },
}

// 기본 User 리스트 보는 곳
router.get('/', (req, res) => {
  res.send('User list')
})

// 계정이 없는 경우 에러처리
router.param('id', async (req, res, next, value) => {
  try {
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error('User not found.')
      err.statusCode = 404
      throw err
    }
    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

// 이미지 라인 uploads -> url 해시링크 걸어주는 곳
router.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    //@ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      nickname: req.user.nickname,
      userId: req.params.id,
      // DB 연동할 때 url값 링크 걸어줘야 하는 부분
      profileImageURL: '/uploads/b10fea57a63cdda245719fe5018d49aa',
    })
  }
})

// 기본 user list post
router.post('/', (req, res) => {
  // Register user
  res.send('User registered.')
})

// 계정 닉네임
router.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname

  res.send(`User nickname updated: ${nickname}`)
})

// 프로필 사진 업로드
router.post('/:id/profile', upload.single('profile'), (req, res, next) => {
  const { user } = req
  const { filename } = req.file
  user.profileImage = filename

  res.send('User profile image uploaded.')
})

module.exports = router
