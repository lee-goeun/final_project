const sql = require("../db/index.js");

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

module.exports = Comment;