const { fstat } = require('fs');
const removeUploadedFiles = require('multer/lib/remove-uploaded-files');
const sql = require('../db/index.js');
var fs = require('fs');
const { json } = require('body-parser');
const { post } = require('../routes/Match.js');

//생성자
const Post = function (post) {
  this.categoryIndex = post.categoryIndex;
  this.userId = post.userId;
  this.boardTitle = post.boardTitle;
  this.boardContent = post.boardContent;
  this.boardViews = post.boardViews;
  this.boardImgList = post.boardImgList;
  this.userNick = post.userNick;
  this.boardDeleted = post.boardDeleted;
};

//Post 생성
Post.create = (newPost, result) => {
  sql.query(
    'INSERT INTO boardTbl(categoryIndex, userId, boardTitle, boardContent, boardViews, boardDeleted) VALUES (?, ?, ?, ?, ?, ?)',
    [
      newPost.categoryIndex,
      newPost.userId,
      newPost.boardTitle,
      newPost.boardContent,
      newPost.boardViews,
      newPost.boardDeleted,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('Created post: ', { id: res.insertId, ...newPost });
      result(null, { id: res.insertId, ...newPost });
    }
  );
};

//Post 전체 조회
Post.getAll = (keyword, result) => {
  if (keyword == 'undefined' || keyword == '' || keyword == null) {
    sql.query(
      'SELECT boardId, categoryIndex, boardTbl.userId, boardTitle, boardContent, boardStatus, boardGood, boardCreated, boardMod, boardViews, boardDeleted, boardReport, boardSearch, boardImgList, userNick FROM userTbl JOIN boardTbl ON userTbl.userId=boardTbl.userId WHERE boardDeleted=0',
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        for (let i = 0; i < res.length; i++) {
          var temp = res[i].boardImgList;
          var templist = temp.split(' ');
          res[i].boardImgList = templist;
          console.log('resi', res[i]);
        }
        result(null, res);
      }
    );
  } else {
    keyword = '%' + keyword + '%';
    sql.query(
      'SELECT boardId, categoryIndex, boardTbl.userId, boardTitle, boardContent, boardStatus, boardGood, boardCreated, boardMod, boardViews, boardDeleted, boardReport, boardSearch, boardImgList, userNick FROM userTbl JOIN boardTbl ON userTbl.userId=boardTbl.userId WHERE boardDeleted=0 and (boardTitle like ? or boardContent like ?) ORDER BY boardCreated DESC',
      [keyword, keyword],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        for (let i = 0; i < res.length; i++) {
          var temp = res[i].boardImgList;
          var templist = temp.split(' ');
          res[i].boardImgList = templist;
          console.log('resi', res[i]);
        }
        result(null, res);
      }
    );
  }
};

//Post 상세보기(id로 조회)
Post.findOne = (postID, userID, result) => {
  sql.query(
    'SELECT * FROM boardTbl WHERE boardId = ? AND boardDeleted=0',
    postID,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        var imgPath = 'boardImages/' + res[0].boardId + '/';

        //닉네임 가져오는 부분
        sql.query(
          'SELECT userNick FROM userTbl WHERE userId=?',
          res[0].userId,
          (err, userNick) => {
            fs.readdir(imgPath, (err, temp) => {
              var imgList = [];
              for (var img in temp) {
                imgList.push(imgPath + temp[img]);
              }
              res[0].boardImgList = imgList;
              res[0].userNick = userNick[0].userNick;

              //조회수 증가
              sql.query(
                'UPDATE boardTbl SET boardViews=? WHERE boardId=?',
                [res[0].boardViews + 1, postID],
                (err, views) => {
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
                }
              );

              //좋아요 상태 가져오기
              sql.query(
                'SELECT postLikeId FROM postLikeTbl WHERE userId=? AND boardId=?',
                [userID, postID],
                (err, good) => {
                  console.log(userID);
                  if (good.length == 0) {
                    res[0].goodStatus = 0;
                  } else {
                    res[0].goodStatus = 1;
                  }

                  //관심 게시물 상태 가져오기
                  sql.query(
                    'SELECT collectId FROM boardCollectTbl WHERE userId=? AND boardId=?',
                    [userID, postID],
                    (err, collect) => {
                      if (collect.length == 0) {
                        res[0].collectStatus = 0;
                      } else {
                        res[0].collectStatus = 1;
                      }

                      result(null, res[0]);
                    }
                  );
                }
              );
            });
          }
        );

        return;
      }

      //결과 없을시
      result({ kind: 'not_found' }, null);
    }
  );
};

//게시글 수정
Post.updateById = (id, post, result) => {
  console.log('test');
  sql.query(
    'UPDATE boardTbl SET categoryIndex=?, boardTitle =?, boardContent=? WHERE boardId=?',
    [post.categoryIndex, post.boardTitle, post.boardContent, id],
    (err, res) => {
      if (err) {
        console.log('error:', err);
        result(err, null);
        return;
      }

      //id 결과 없을시
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('update post: ', { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

//게시물 삭제
Post.remove = (id, result) => {
  sql.query(
    'UPDATE boardTbl SET boardDeleted=1 WHERE boardId=?',
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      //id 결과가 없을시
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('deleted post with id: ', id);
      result(null, res);
    }
  );
};

//게시물 좋아요
Post.like = (postID, userID, result) => {
  sql.query(
    'SELECT postLikeId FROM postLikeTbl WHERE boardId=? AND userId=?',
    [postID, userID],
    (err, good) => {
      //좋아요 하지 않은 게시물일 경우
      if (good.length == 0) {
        //boardGoodTbl에 좋아요 데이터 추가
        sql.query(
          'INSERT INTO postLikeTbl(boardId, userId) VALUES(?, ?)',
          [postID, userID],
          (err, insert) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            //boardtbl의 boardGood 좋아요 개수 증가
            sql.query(
              'SELECT boardGood FROM boardTbl WHERE boardId=?',
              postID,
              (err, boardgood) => {
                if (err) {
                  console.log('error: ', err);
                  result(err, null);
                  return;
                }
                //id 결과가 없을시
                if (boardgood.affectedRows == 0) {
                  result({ kind: 'not_found' }, null);
                  return;
                }

                //게시글 좋아요 개수 증가
                sql.query(
                  'UPDATE boardTbl SET boardGood=? where boardId=?',
                  [boardgood[0].boardGood + 1, postID],
                  (err, res) => {
                    if (err) {
                      console.log('error:', err);
                      result(err, null);
                      return;
                    }

                    //id 결과 없을시
                    if (res.affectedRows == 0) {
                      result({ kind: 'not_found' }, null);
                      return;
                    }

                    console.log('like post: ', postID);
                    result(null, { id: postID, ...res });
                  }
                );
              }
            );

            console.log('Created boardGood: ', insert.insertId);
            // result(null, insert.insertId);
          }
        );
      } else {
        //좋아요한 게시물일 경우(좋아요 취소)
        sql.query(
          'DELETE FROM postLikeTbl WHERE postLikeId=?',
          good[0].postLikeId,
          (err, del) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            //id 결과가 없을시
            if (del.affectedRows == 0) {
              result({ kind: 'not_found' }, null);
              return;
            }

            //boardtbl의 boardGood 좋아요 개수 감소
            sql.query(
              'SELECT boardGood FROM boardTbl WHERE boardId=?',
              postID,
              (err, boardgood) => {
                if (err) {
                  console.log('error: ', err);
                  result(err, null);
                  return;
                }
                //id 결과가 없을시
                if (boardgood.affectedRows == 0) {
                  result({ kind: 'not_found' }, null);
                  return;
                }

                //게시글 좋아요 개수 감소
                sql.query(
                  'UPDATE boardTbl SET boardGood=? where boardId=?',
                  [boardgood[0].boardGood - 1, postID],
                  (err, res) => {
                    if (err) {
                      console.log('error:', err);
                      result(err, null);
                      return;
                    }

                    //id 결과 없을시
                    if (res.affectedRows == 0) {
                      result({ kind: 'not_found' }, null);
                      return;
                    }

                    console.log('like cancel post: ', postID);
                    console.log('res: ', res);
                    // result(null, {id:postID});
                    // return;
                  }
                );
              }
            );

            console.log('deleted boardgood with id: ', good[0]);
            result(null, del);
          }
        );
      }
    }
  );
};

//관심 게시물
Post.collect = (postID, userID, result) => {
  sql.query(
    'SELECT collectId FROM boardCollectTbl WHERE boardId=? AND userId=?',
    [postID, userID],
    (err, col) => {
      if (col.length == 0) {
        sql.query(
          'INSERT INTO boardCollectTbl(boardId, userId) VALUES(?, ?)',
          [postID, userID],
          (err, res) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            console.log('Created collect: ', res.insertId);
            result(null, res.insertId);
          }
        );
      } else {
        sql.query(
          'DELETE FROM boardCollectTbl WHERE collectId=?',
          col[0].collectId,
          (err, del) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            //id 결과가 없을시
            if (del.affectedRows == 0) {
              result({ kind: 'not_found' }, null);
              return;
            }

            console.log('deleted collect with id: ', col[0]);
            result(null, del);
          }
        );
      }

      return;
    }
  );
};

//게시물 신고
Post.report = (postID, userID, result) => {
  //신고 게시물의 유저 아이디 가져오기
  sql.query(
    'SELECT userId FROM boardTbl WHERE boardId=?',
    postID,
    (err, board) => {
      sql.query(
        'INSERT INTO boardReportTbl(boardId, userId, reportedUserId) values(?, ?, ?)',
        [postID, userID, board[0].userId],
        (err, res) => {
          if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
          }

          console.log('Created report: ', res.insertId);
          result(null, res.insertId);
          return;
        }
      );

      return;
    }
  );
};

module.exports = Post;
