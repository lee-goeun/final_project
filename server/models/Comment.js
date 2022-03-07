const { resourceLimits } = require("worker_threads");
const sql = require("../db/index.js");
const { post } = require("../routes/Match.js");

//생성자
const Comment = function(comment) {
  this.categoryIndex = comment.categoryIndex;
  this.boardId = comment.boardId;
  this.commentContent = comment.commentContent;
  this.userId = comment.userId;
};

Comment.create = (newComment, result) => {
  

  sql.query("INSERT INTO boardCommentTbl(categoryIndex, boardId, commentContent, userId) VALUES (?, ?, ?, ?)"
  ,[newComment.categoryIndex, newComment.boardId, newComment.commentContent, newComment.userId]
  , (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created comment: ", {id:res.insertId, ...newComment});
    result(null, {id: res.insertId, ...newComment});
  });
};

Comment.find = (postId, result) => {
  sql.query('SELECT userNick, commentContent, commentLikeCounting, commentCreated FROM userTbl LEFT JOIN boardCommentTbl ON userTbl.userId= boardCommentTbl.userId WHERE boardCommentTbl.boardId=55',
  postId, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.length) {
      result(null, res);
    }
  })
}

module.exports = Comment;