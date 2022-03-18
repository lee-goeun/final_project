module.exports = (app) => {
  const posts = require('../controllers/postController.js');
  const express = require('express');
  const postRouter = express.Router();
  const bodyParser = require('body-parser');
  const conn = require('../db/index');

  //이미지 파일 업로드
  const multer = require('multer');
  const fs = require('fs');

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'boardImages/temp'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
  });

  //이미지 읽어오는 경로
  postRouter.get('/download', (req, res) => {
    var img = req.query.boardImgName;

    fs.readFile(img, function (err, results) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(results);
    });
  });

  const upload = multer({ storage: storage });

  //모든 게시글 조회 GET
  postRouter.get('/', posts.findAll);

  //게시글 작성 POST
  postRouter.post('/post', upload.array('img', 5), posts.create);

  //게시글 상세보기
  postRouter.get('/post/:postId', posts.findOne);

  //게시글 삭제
  postRouter.delete('/post/:postId', posts.delete);

  //게시글 수정
  postRouter.put('/post/edit/:postId', posts.update);

  //게시글 좋아요
  postRouter.post('/post/:postId/like', posts.like);

  //관심게시물
  postRouter.post('/post/:postId/collect', posts.collect);

  //게시물 신고
  postRouter.post('/post/:postId/report', posts.report);

  app.use('/board', postRouter);
};
