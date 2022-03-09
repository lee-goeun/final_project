module.exports = app => {
  const express = require('express');
  const commentRouter = express.Router();
  const comments = require("../controllers/commentController");
  const bodyParser = require('body-parser');
  //댓글 작성 POST
  commentRouter.post('/comment/:postId', comments.create);

  //댓글 삭제
  commentRouter.delete('/comment/:commentId', comments.delete);

  //게시글 수정
  commentRouter.post('/comment/edit/:commentId', comments.update);

  app.use("/board", commentRouter);
}