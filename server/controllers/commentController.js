const Comment = require("../models/Comment.js");

const conn = require("../db/index.js");
const Post = require("../models/Post.js");
const { resourceLimits } = require("worker_threads");

//새 댓글 생성
exports.create = (req, res) => {

  var postId = req.params.postId;
  var post = null;

  conn.query("SELECT * FROM boardtbl WHERE boardId=?", postId, (err, result) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(!req.body) {
      result.status(400).send({
        message: "Content can not be empty!"
      });
    };

    console.log("board result: ", result[0])
  
    const comment = new Comment({
      categoryIndex : result[0].categoryIndex,
      boardId : result[0].boardId,
      commentContent : req.body.commentContent,
      userId : req.body.userId
    });
  
    //데이터베이스에 저장
    Comment.create(comment, (err, data) => {
      if(err) {
        res.status(500).send({
          message:
          err.message || "Some error occurred while creating the Comment."
        });
      } else {
        // res.send({
        //   message: `Comment was created successfully!`
        // });
  
        res.redirect('/board/post/' + postId);
      };
    });
  });
}

