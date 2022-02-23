const express = require("express");
const conn = require("../db/index");
const router = express.Router();
const { json } = require("body-parser");

//조회
router.get('/list', (req, res) => {
    var sql = "select * from chatroomTbl where chatroom_deleted = 0";
        conn.query(sql,(err, results) => {
            if(err) return res.json({success:false, err});
            else return res.json(results);
        });
})

//추가
router.post('/add',(req,res) => {
    console.log("req", req.body);
    var body = req.body;

    //TODO : 로그인한 정보 넣기
    var participant = "test02";

    var sql = "insert into chatroomTbl(matchId, user_id, participant) VALUES(?, ?, ?)";
    conn.query(sql, [body.matchId, body.user_id, participant],(err, results) => {
        if(err) return res.json({success:false, err});
        else   res.json({status:"success"});
    })
});

//추가(메세지)
router.post('/addMsg',(req,res) => {
    console.log("req", req.body);
    var body = req.body;

    //TODO : 로그인한 정보 넣기
    //TODO : 웹소켓 관련해서 테스트 해보기
    var participant = "test02";

    var sql = "insert into chatTbl(chatroomId, user_id, chat_message) VALUES(?, ?, ?)";
    conn.query(sql, [body.chatroomId, body.user_id, body.chat_message],(err, results) => {
        if(err) return res.json({success:false, err});
        else   res.json({status:"success"});
    })
});

//상세(메세지)
router.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    var sql = "select * from chatTbl where chatroomId = ?";

    conn.query(sql, id, (err, results) => {
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
});


module.exports = router;