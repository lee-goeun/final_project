const sql = require("../db/index.js");

//생성자
const Post = function(post) {
    this.categoryIndex = post.categoryIndex;
    this.userId = post.userId;
    this.boardTitle = post.boardTitle;
    this.boardContent = post.boardContent;
    this.boardViews = post.boardViews;
};

//Post 생성 
Post.create = (newPost, result) => {
    sql.query("INSERT INTO boardtbl(categoryIndex, userId, boardTitle, boardContent, boardViews) VALUES (?, ?, ?, ?, ?)"
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
    sql.query("SELECT * FROM boardtbl", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("post: ", res);
        result(null, res);
    });
};

//Post 상세보기(id로 조회)
Post.findOne = (postID, result) => {
    sql.query('SELECT * FROM boardtbl WHERE boardId = ?', postID, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("found post: ", res[0]);
            result(null, res[0]);
            return;
        }

        //결과 없을시
        result({kind:"not_found"}, null);
    });
};

//게시글 수정
Post.updateById = (id, post, result) => {
    sql.query("UPDATE boardtbl SET categoryIndex=?, boardTitle =?, boardContent=? WHERE boardId=?",
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
    sql.query('DELETE FROM boardtbl WHERE boardId=?', id, (err, res) => {
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


module.exports = Post;