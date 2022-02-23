module.exports = app => {
    const posts = require("../controllers/postController.js");
    const express = require('express');
    const postRouter = express.Router();

    //모든 게시글 조회
    postRouter.get('/', posts.findAll);

    //게시글 작성 GET / POST
    // postRouter.get('/post', getWrite);
    postRouter.post('/post', posts.create);

    // //특정 게시글 GET / DELETE
    postRouter.get('/post/:postId', posts.findOne);
    postRouter.delete('/post/:postId', posts.delete);

    // //게시글 수정 GET / POST
    // postRouter.get('/post/edit/:postId', getEditPost);
    postRouter.post('/post/edit/:postId', posts.update);


    app.use("/board", postRouter);
};
