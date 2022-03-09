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
  sql.query('SELECT userNick, commentContent, commentLikeCounting, commentCreated FROM usertbl LEFT JOIN boardCommentTbl ON usertbl.userId= boardCommentTbl.userId WHERE boardCommentTbl.boardId=?',
  postId, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.length) {
      result(null, res);
      return;
    } 

    result({kind:"not_found"}, null);
  })
}

//댓글 수정
Comment.updateById = (id, comment, result) => {
  sql.query("UPDATE boardCommentTbl SET commentContent=? WHERE commentId=?",
  [comment.commentContent, id], (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //id결과 없을시
    if(res.affectedRows == 0) {
      result({kind:"not_found"}, null);
      return;
    }

    console.log("update post: ", {id:id, ...comment});
    result(null, {id:id, ...post});
  });
};

//댓글 삭제
Comment.remove = (id, result) => {
  sql.query('DELETE FROM boardCommentTbl WHERE commentId=?', id, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //id 결과 없을시
    if(res.affectedRows == 0) {
      result({kind:"not_found"}, null);
      return;
    }

    console.log("deleted post with id: ", id);
    result(null, res);
  });
};



module.exports = Comment;