const Comment = require('../models/Comment.js');

const conn = require('../db/index.js');
// const Post = require("../models/Post.js");
// const { resourceLimits } = require("worker_threads");
const jwt = require('jsonwebtoken');
const { resolveSoa } = require('dns');

//새 댓글 생성
exports.create = (req, res) => {
  var postId = req.params.postId;
  console.log('postId', postId);
  var post = null;
  console.log('commentContent', req.body);

  conn.query(
    'SELECT * FROM boardtbl WHERE boardId=?',
    postId,
    (err, result) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (!req.body) {
        result.status(400).send({
          message: 'Content can not be empty!',
        });
      }

      console.log('board result: ', result[0]);

      const comment = new Comment({
        categoryIndex: result[0].categoryIndex,
        boardId: result[0].boardId,
        commentContent: req.body.commentContent,
        userId: req.body.userId,
        commentLikeCounting: 0,
        commentDeleted: 0,
        cgoodStatus: 0,
      });

      //데이터베이스에 저장
      Comment.create(comment, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Comment.',
          });
        } else {
          // res.send({
          //   message: `Comment was created successfully!`
          // });

          res.redirect('/board/post/' + postId);
        }
      });
    }
  );
};

//댓글 수정
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Comment.updateById(
    req.params.commentId,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.commentId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Comment with id' + req.params.commentId,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

//댓글 삭제
exports.delete = (req, res) => {
  Comment.remove(req.params.commentId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Comment with id ' + req.params.commentId,
        });
      }
    } else {
      res.send({
        message: `Comment was deleted successfully!`,
      });
    }
  });
};

//댓글 좋아요
exports.like = (req, res) => {
  Comment.like(req.params.commentId, req.body.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.commentId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Comment with id' + req.params.commentId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

//댓글 신고
exports.report = (req, res) => {
  Comment.report(req.body.commentId, req.body.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Post with id ${req.body.commentId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Post with id ' + req.body.commentId,
        });
      }
    } else {
      res.send({
        message: `Report successfully!`,
      });
    }
  });
};
