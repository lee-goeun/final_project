module.exports = app => {
  const express = require('express');
  const commentRouter = express.Router();
  const comments = require("../controllers/commentController");
  
  //댓글 작성 POST
  commentRouter.post('/comment/:postId', comments.create);

  app.use("/board", commentRouter);
}