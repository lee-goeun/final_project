const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const fs = require('fs');
// const { post } = require("../routes/Match.js");
const conn = require('../db/index.js');
const jwt = require('jsonwebtoken');

//새 객체 생성
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      messsage: 'Content can not be empty!',
    });
  }

  var userId = '';
  jwt.verify(req.body.token, process.env.JWT_SECRET, function (err, decode) {
    console.log('ssss', decode);
    userId = decode.userId;
  });

  const post = new Post({
    categoryIndex: req.body.categoryIndex,
    userId: userId,
    boardTitle: req.body.boardTitle,
    boardContent: req.body.boardContent,
    boardViews: 0,
    boardDeleted: 0,
  });

  //데이터베이스에 저장
  Post.create(post, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Post.',
      });
    } else {
      res.send({
        message: `Post was created successfully!`,
      });
    }
  });

  console.log('사진 개수 : ', req.files.length);

  let urlArr = new Array();
  for (let i = 0; i < req.files.length; i++) {
    urlArr.push(`${req.files[i].filename}`);
    console.log(urlArr[i]);
  }

  //이미지 boardImages/boardId 경로 아래에 저장
  conn.query(
    'SELECT boardId FROM boardtbl ORDER BY boardCreated DESC LIMIT 1',
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        var boardId = results[0].boardId;

        var newdir = 'boardImages/' + boardId + '/';

        if (URLSearchParams.lengh != 0) {
          if (!fs.existsSync(newdir)) {
            fs.mkdirSync(newdir);
          }

          var imgList = '';

          for (let i = 0; i < urlArr.length; i++) {
            var oldPath = 'boardImages/temp/' + urlArr[i];
            var newPath = newdir + urlArr[i];
            urlArr[i] = newPath;

            //이미지 리스트에 String 변수로 저장
            if (i == urlArr.length - 1) {
              imgList += newPath;
            } else {
              imgList += newPath + ' ';
            }

            fs.rename(oldPath, newPath, function (err) {
              if (err) throw err;
              console.log('move success');
            });
          }
        }
      }

      conn.query(
        'UPDATE boardtbl SET boardImgList=? WHERE boardId=?',
        [imgList, boardId],
        (err, res) => {
          if (err) {
            console.log('error:', err);
            // result(err, null);
            return;
          }

          //id 결과 없을시
          if (res.affectedRows == 0) {
            // result({kind:"not_found"}, null);
            return;
          }

          // console.log("update post: ", {id:id, ...post});
          // result(null, {id:id, ...post});
        }
      );
    }
  );
};

//전체 조회(검색)
exports.findAll = (req, res) => {
  var keyword = req.query.keyword;
  Post.getAll(keyword, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving posts.',
      });
    } else {
      res.send(data);
    }
  });
};

//이미지 업로드
// exports.imgUpload = (req, res, next) => {
//   upload.array('img', 5)(req, res, () => {

// }

//게시판 상세보기
exports.findOne = (req, res) => {
  console.log('board login id: ', req.query.userId);
  Post.findOne(req.params.postId, req.query.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          messge: `Not found Post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Post with id' + req.params.postId,
        });
      }
    } else {
      //댓글 보기
      Comment.find(req.query.userId, req.params.postId, (err, comment) => {
        if (err) {
          if (err.kind === 'not_found') {
            data.comment = null;
            res.send(data);
          } else {
            res.status(500).send({
              message: 'Error retrieving Post with id' + req.params.postId,
            });
          }
        } else {
          // if (comment.length == 0) {
          //   console.log('found post: ', data);
          //   res.send(data);
          // } else {
          //   data.comment = comment;
          //   console.log('found post: ', data);
          //   res.send(data);
          // }

          data.comment = comment;
          console.log('found post: ', data);
          res.send(data);
        }
      });
    }
  });
};

//게시판 수정
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Post.updateById(req.params.postId, new Post(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Post with id' + req.params.postId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

//게시글 삭제
exports.delete = (req, res) => {
  Post.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Post with id ' + req.params.postId,
        });
      }
    } else {
      res.send({
        message: `Post was deleted successfully!`,
      });
    }
  });
};

//게시글 좋아요
exports.like = (req, res) => {

  var userId = '';
  jwt.verify(req.body.userId, process.env.JWT_SECRET, function (err, decode) {
    console.log('ssss', decode);
    userId = decode.userId;
  });

  Post.like(req.params.postId, userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          messge: `Not found Post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Post with id' + req.params.postId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

//관심 게시물
exports.collect = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  Post.collect(req.params.postId, req.body.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Collect.',
      });
    } else {
      res.send({
        message: `Collect successfully!`,
      });
    }
  });
};

//게시물 신고하기
exports.report = (req, res) => {
  Post.report(req.params.postId, req.body.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Post with id ' + req.params.postId,
        });
      }
    } else {
      res.send({
        message: `Report successfully!`,
      });
    }
  });
};
