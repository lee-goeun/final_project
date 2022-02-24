

module.exports = app => {
    const posts = require("../controllers/postController.js");
    const express = require('express');
    const postRouter = express.Router();
    const bodyParser = require("body-parser");
    const conn = require("../db/index");

    //이미지 파일 업로드
    const multer = require('multer');
    const fs = require('fs');
        

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null,'../boardImages/temp') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
      }
    });

    const upload = multer({storage: storage});
    //모든 게시글 조회
    postRouter.get('/', posts.findAll);

    //게시글 작성 GET / POST
    // postRouter.get('/post', getWrite);
    postRouter.post('/post', upload.array('img', 5), posts.create);

    //이미지 업로드
    // postRouter.post('/post/upload', upload.array('img', 5), posts.upload);

    // //특정 게시글 GET / DELETE
    postRouter.get('/post/:postId', posts.findOne);
    postRouter.delete('/post/:postId', posts.delete);

    // //게시글 수정 GET / POST
    // postRouter.get('/post/edit/:postId', getEditPost);
    postRouter.post('/post/edit/:postId', posts.update);

    //게시글 좋아요
    postRouter.post('/post/:postId/like', posts.like); 


    app.use("/board", postRouter);
};
