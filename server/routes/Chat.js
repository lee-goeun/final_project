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

//상세
router.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    var sql = "select * from matchTbl where matchId = ?";

    conn.query(sql, id, (err, results) => {
        if(err) return res.json({success:false, err});
        else res.json(results);
    })
});

//삭제
router.put('/del/:id', (req, res) => {
    let id = req.params.id;
    var sql = "UPDATE matchTbl set matchDeleted=1 where matchId=?";
    conn.query(sql, id, (err, results) => {
            if(err) return res.json({success:false, err});
            else res.json({status:"success"});
    })
});

module.exports = router;