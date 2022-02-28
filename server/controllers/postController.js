const Post = require("../models/Post.js");

const fs = require('fs');
// const { post } = require("../routes/Match.js");
const conn = require("../db/index.js");



//새 객체 생성
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            messsage: "Content can not be empty!"
        });
    };

    const post = new Post({
        categoryIndex : req.body.categoryIndex,
        userId : req.body.userId,
        boardTitle : req.body.boardTitle,
        boardContent : req.body.boardContent,
        boardViews : req.body.boardViews,
        // boardImgList : imgId + "_" + userId
    });

    //데이터베이스에 저장
    Post.create(post, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Post."
            });
        } else {
            res.send({
                message: `Post was created successfully!`
            });
        };
    });

    console.log("파일 이름 : ", req.files);  

    let urlArr = new Array();
    for (let i = 0; i < req.files.length; i++) {
      urlArr.push(`${req.files[i].filename}`);
      console.log(urlArr[i]);
    }

    //이미지 boardImages/boardId 경로 아래에 저장
    conn.query("SELECT boardId FROM boardtbl ORDER BY boardCreated DESC LIMIT 1", (err, results)=>{
      if(err) return res.json({success:false, err});
      else {
        var boardId = results[0].boardId;

        var newdir = "boardImages/" + boardId + "/";

        if(URLSearchParams.lengh != 0){
            if(!fs.existsSync(newdir)){
                fs.mkdirSync(newdir);
            }

            for (let i = 0; i < urlArr.length; i++) {
              var oldPath = "boardImages/temp/" + urlArr[i];
              var newPath = newdir + urlArr[i];
              urlArr[i] = newPath;

              fs.rename(oldPath, newPath, function (err) {
                  if (err) throw err
                  console.log('move success');
              })
            }
          }
      };
    });
};


//전체 조회
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving posts."
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
    Post.findOne(req.params.postId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    messge: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with id" + req.params.postId
                });
            }
        } else {
            res.send(data);
        }
    });
};

//게시판 수정
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Post.updateById(
        req.params.postId,
        new Post(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.postId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id" + req.params.postId
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

//게시글 삭제
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Post with id " + req.params.postId
                });
            }
        } else {
            res.send({
                message: `Post was deleted successfully!`
            });
        }
    });

};

//게시글 좋아요
exports.like = (req, res) => {
  Post.like(req.params.postId, (err, data) => {
    if(err) {
      if(err.kind === "not_found") {
          res.status(404).send({
              messge: `Not found Post with id ${req.params.postId}.`
          });
      } else {
          res.status(500).send({
              message: "Error retrieving Post with id" + req.params.postId
          });
      }
    } else {
        res.send(data);
    }
  })
}