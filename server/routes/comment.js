module.exports = (app) => {
  const express = require('express');
  const commentRouter = express.Router();
  const comments = require('../controllers/commentController');
  const bodyParser = require('body-parser');
  //댓글 작성 POST [완료]
  commentRouter.post('/comment/:postId', comments.create);

  //댓글 삭제 [완료]
  commentRouter.delete('/comment/:commentId', comments.delete);

  //댓글 수정 [완료] post[데이터 등록 및 전송]-> put[수정]
  commentRouter.put('/comment/edit/:commentId', comments.update);

  //댓글 좋아요 [완료]
  commentRouter.post('/comment/:commentId/like', comments.like);

  //댓글 신고 [완료]
  commentRouter.post('/comment/:postId/report', comments.report);

  app.use('/board', commentRouter);
};
