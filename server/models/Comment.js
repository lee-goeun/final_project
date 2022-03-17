const { resourceLimits } = require('worker_threads');
const sql = require('../db/index.js');
const { post } = require('../routes/Match.js');

//생성자
const Comment = function (comment) {
  this.categoryIndex = comment.categoryIndex;
  this.boardId = comment.boardId;
  this.commentContent = comment.commentContent;
  this.userId = comment.userId;
  this.commentLikeCounting = comment.commentLikeCounting;
  this.commentDeleted = comment.commentDeleted;
};

//댓글 작성
Comment.create = (newComment, result) => {
  sql.query(
    'INSERT INTO boardCommentTbl(categoryIndex, boardId, commentContent, userId, commentDeleted) VALUES (?, ?, ?, ?, ?)',
    [
      newComment.categoryIndex,
      newComment.boardId,
      newComment.commentContent,
      newComment.userId,
      newComment.commentDeleted,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('Created comment: ', { id: res.insertId, ...newComment });
      result(null, { id: res.insertId, ...newComment });
    }
  );
};

//댓글 조회
Comment.find = (postId, result) => {
  sql.query(
    'SELECT userNick, commentContent, commentLikeCounting, commentCreated, commentId FROM usertbl LEFT JOIN boardCommentTbl ON usertbl.userId= boardCommentTbl.userId WHERE boardCommentTbl.boardId=? AND boardCommentTbl.commentDeleted=0 ORDER BY commentCreated',
    postId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }

      result({ kind: 'not_found' }, null);
    }
  );
};

//댓글 수정
Comment.updateById = (id, comment, result) => {
  sql.query(
    'UPDATE boardCommentTbl SET commentContent=? WHERE commentId=?',
    [comment.commentContent, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      //id결과 없을시
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('update post: ', { id: id, ...comment });
      result(null, { id: id, ...post });
    }
  );
};

//댓글 삭제
Comment.remove = (id, result) => {
  sql.query(
    'UPDATE boardCommentTbl SET commentDeleted=1 WHERE commentId=?',
    id,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      //id 결과 없을시
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('deleted post with id: ', id);
      result(null, res);
    }
  );
};

//댓글 좋아요
Comment.like = (commentID, userID, result) => {
  sql.query(
    'SELECT commentLikeId FROM commentLikeTbl WHERE commentId=? AND userId=?',
    [commentID, userID],
    (err, good) => {
      //좋아요 하지 않은 댓글일 경우
      if (good.length == 0) {
        console.log('좋아요 하지 않은 댓글');
        //commentTbl에 좋아요 데이터 추가
        sql.query(
          'INSERT INTO commentLikeTbl(commentId, userId) VALUES(?, ?)',
          [commentID, userID],
          (err, insert) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            //commentTbl의 좋아요 개수 증가
            sql.query(
              'SELECT commentLikeCounting FROM boardCommentTbl WHERE commentId=?',
              commentID,
              (err, commentgood) => {
                if (err) {
                  console.log('error: ', err);
                  result(err, null);
                  return;
                }

                //id 결과 없을시
                if (commentgood.affectedRows == 0) {
                  result({ kind: 'not_found' }, null);
                  return;
                }

                sql.query(
                  'UPDATE boardCommentTbl SET commentLikeCounting=? WHERE commentId=?',
                  [commentgood[0].commentLikeCounting + 1, commentID],
                  (err, res) => {
                    if (err) {
                      console.log('error: ', err);
                      result(err, null);
                      return;
                    }

                    //id 결과 없을시
                    if (res.affectedRows == 0) {
                      result({ kind: 'not_found' }, null);
                      return;
                    }

                    console.log('like comment: ', commentID);
                    result(null, res);
                  }
                );
              }
            );

            console.log('Created commentGood: ', insert.insertId);
          }
        );
      } else {
        //좋아요한 댓글일 경우(좋아요 취소)
        sql.query(
          'DELETE FROM commentLikeTbl WHERE commentLikeId=?',
          good[0].commentLikeId,
          (err, del) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }

            //id결과가 없을시
            if (del.affectedRows == 0) {
              result({ kind: 'not_found' }, null);
              return;
            }

            //boardtbl의 boardGood 좋아요 개수 감소
            sql.query(
              'SELECT commentLikeCounting FROM boardCommentTbl WHERE commentId=?',
              commentID,
              (err, commentgood) => {
                if (err) {
                  console.log('error: ', err);
                  result(err, null);
                  return;
                }
                //id 결과가 없을시
                if (commentgood.affectedRows == 0) {
                  result({ kind: 'not_found' }, null);
                  return;
                }

                //댓글 좋아요 개수 감소
                sql.query(
                  'UPDATE boardCommentTbl SET commentLikeCounting=? where commentId=?',
                  [commentgood[0].commentLikeCounting - 1, commentID],
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

                    console.log('like post: ', commentID);
                    // result(null, res);
                  }
                );
              }
            );

            console.log('deleted commentgood with id: ', good[0]);
            result(null, del);
          }
        );
      }
    }
  );
};

//댓글 신고
Comment.report = (commentID, userID, result) => {
  //신고 댓글의 유저 아이디 가져오기
  console.log('댓글 모델로 들어옴');
  sql.query(
    'SELECT userId FROM boardCommentTbl WHERE commentId=?',
    commentID,
    (err, comment) => {
      sql.query(
        'INSERT INTO commentReportTbl(commentId, userId, reportedUserId) values(?, ?, ?)',
        [commentID, userID, comment[0].userId],
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

module.exports = Comment;
