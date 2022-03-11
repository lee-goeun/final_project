const { fstat } = require("fs");
const removeUploadedFiles = require("multer/lib/remove-uploaded-files");
const sql = require("../db/index.js");
var fs = require('fs');
const { json } = require("body-parser");

//생성자
const Post = function(post) {
    this.categoryIndex = post.categoryIndex;
    this.userId = post.userId;
    this.boardTitle = post.boardTitle;
    this.boardContent = post.boardContent;
    this.boardViews = post.boardViews;
    this.boardImgList = post.boardImgList;
    this.userNick = post.userNick;
};

//Post 생성 
Post.create = (newPost, result) => {


    sql.query("INSERT INTO boardTbl(categoryIndex, userId, boardTitle, boardContent, boardViews) VALUES (?, ?, ?, ?, ?)"
    ,[newPost.categoryIndex, newPost.userId, newPost.boardTitle, newPost.boardContent, newPost.boardViews]
    , (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created post: ", { id:res.insertId, ...newPost });
        result(null, {id: res.insertId, ...newPost});
    });
    

};

//Post 전체 조회
Post.getAll = result => {
    sql.query("SELECT boardId, categoryIndex, boardTbl.userId, boardTitle, boardContent, boardStatus, boardGood, boardCreated, boardMod, boardViews, boardDeleted, boardReport, boardSearch, boardImgList, userNick FROM userTbl JOIN boardTbl ON userTbl.userId=boardTbl.userId", 
    (err, res) => {
      if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
      
      for (let i = 0; i < res.length; i++) {
        var temp = res[i].boardImgList;
        var templist = temp.split(' ');
        res[i].boardImgList = templist;
        console.log("resi", res[i]);
      }        
        result(null, res);
    });

};

//Post 상세보기(id로 조회)
Post.findOne = (postID, result) => {
    sql.query('SELECT * FROM boardTbl WHERE boardId = ?', postID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("found post: ", res[0]);
            var imgPath = "boardImages/" + res[0].boardId + "/";
            sql.query('SELECT userNick FROM userTbl WHERE userId=?', res[0].userId, (err, userNick) => {
              fs.readdir(imgPath, (err, temp) => {
                var imgList = [];
                for(var img in temp) {
                  imgList.push(imgPath + temp[img]);
                }
                res[0].boardImgList = imgList;
                res[0].userNick = userNick[0].userNick;

                //조회수 증가
                sql.query('UPDATE boardTbl SET boardViews=? WHERE boardId=?', [res[0].boardViews+1, postID], (err, views) => {
                  if(err) {
                    console.log("error:", err);
                    // result(err, null);
                    return;
                  }
                  
                  //id 결과 없을시
                  if(res.affectedRows == 0) {
                      // result({kind:"not_found"}, null);
                      return;
                  }

                  
                })
                result(null, res[0]);
                
              });
            });
            //조회수 증가
            
            return;
        }

        //결과 없을시
        result({kind:"not_found"}, null);
    });
};

//게시글 수정
Post.updateById = (id, post, result) => {
    sql.query("UPDATE boardTbl SET categoryIndex=?, boardTitle =?, boardContent=? WHERE boardId=?",
    [post.categoryIndex, post.boardTitle, post.boardContent, id], (err, res) => {
        if(err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        
        //id 결과 없을시
        if(res.affectedRows == 0) {
            result({kind:"not_found"}, null);
            return;
        }

        console.log("update post: ", {id:id, ...post});
        result(null, {id:id, ...post});
    });
};

//게시물 삭제
Post.remove = (id, result) => {
    sql.query('DELETE FROM boardTbl WHERE boardId=?', id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //id 결과가 없을시
        if(res.affectedRows == 0) {
            result({kind:"not_found"}, null);
            return;
        }

        console.log("deleted post with id: ", id);
        result(null, res);
    });
};

//게시물 좋아요
Post.like = (postID, result) => {
  sql.query('SELECT boardGood FROM boardTbl WHERE boardId=?', postID, (err, boardgood) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //id 결과가 없을시
    if(boardgood.affectedRows == 0) {
        result({kind:"not_found"}, null);
        return;
    }
    
    console.log("좋아요 개수: ", boardgood[0])
    //게시글 좋아요 개수 증가
    sql.query('UPDATE boardTbl SET boardGood=? where boardId=?', [boardgood[0].boardGood + 1, postID], (err, res) => {
      if(err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      
      //id 결과 없을시
      if(res.affectedRows == 0) {
          result({kind:"not_found"}, null);
          return;
      }

      console.log("like post: ", postID);
      result(null, res);
    })
  })
}

//관심 게시물 
Post.collect = (postID, userID, result) => {
  sql.query('SELECT collectId FROM boardCollectTbl WHERE boardId=? AND userId=?', [postID, userID], (err, col) => {
    console.log(col.length);
    if(col.length == 0) {
      sql.query('INSERT INTO boardCollectTbl(boardId, userId) VALUES(?, ?)', [postID, userID], (err, res) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
   
        console.log("Created collect: ", res.insertId);
        result(null, res.insertId);
     });
    } else {
      sql.query('DELETE FROM boardCollectTbl WHERE collectId=?', col[0].collectId, (err, del) => {
        if(err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        
        //id 결과가 없을시
        if(del.affectedRows == 0) {
            result({kind:"not_found"}, null);
            return;
        }

        console.log("deleted collect with id: ", col[0]);
        result(null, del);

      });
    }

    return;
  })
 
}


module.exports = Post;