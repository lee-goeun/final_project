const Post = require("../models/Post.js");

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
        boardViews : req.body.boardViews
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
    })
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