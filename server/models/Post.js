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
    sql.query("SELECT * FROM boardTbl", (err, res) => {
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
            fs.readdir(imgPath, (err, temp) => {
              var imgList = [];
              for(var img in temp) {
                imgList.push(imgPath + temp[img]);
              }
              res[0].boardImgList = imgList;
              result(null, res[0]);
            });
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


module.exports = Post;