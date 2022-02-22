const db = require("../models/index.js");
const Post = db.posts;
const Op = db.Sequelize.Op;

//create and db insert
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //create post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.publisehd : false
    };

    //Save Tutorial in thte database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while createing the Post."
            });
        });
 };
