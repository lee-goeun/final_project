
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const conn = require("../db/index");
const router = express.Router();
const { json } = require("body-parser");
const { emit } = require("process");
const io = require('socket.io')(http);


//웹소켓관련
io.on('connection', socket => {
  //console.log("user Connected");
  socket.on('disconnect',()=>{
   // console.log('user Disconnect');
  })
})

http.listen(3002, () => console.log('listing on port 3002'));

io.on('connection', socket => {
  //console.log('sssss');
  socket.on('send message', (item) => {
    const msg = item.name + ":" + item.message;
    console.log(msg);
    io.emit('receive message', {name:item.name,message:item.message});
  });
  socket.on('disconnect', function(){
   // console.log('user disconnected', socket.id);
  })
})

//조회
router.get('/list', (req, res) => {
    var sql = "select * from chatroomTbl where chatroomDeleted = 0";
        conn.query(sql,(err, results) => {
            if(err) return res.json({success:false, err});
            else{
              chatList = results;
              return res.json(results);
            } 
        });
})

//추가
router.post('/add',(req,res) => {
    console.log("req", req.body);
    var body = req.body;

    //해당 아이디가 있는 지 확인하기
    conn.query("select * from chatroomTbl where chatroomDeleted = 0 and participant = ? and matchId = ?;",
      [body.participant, body.matchId], (err, results) => {
        if(err) return res.json({success:false, err});
        else{
            if(results.length == 1){
              res.json({status:"참여중"});
            }else{
                //참여하고 있지 않은 아이디만 추가
                var sql = "insert into chatroomTbl(matchId, userId, participant) VALUES(?, ?, ?)";
                conn.query(sql, [body.matchId, body.userId, body.participant],(err, results) => {
                    if(err) res.json({success:false, err});
                    else res.json({status:"success"});
                })
            }
        } 
    });
});

//추가(메세지)
router.post('/addMsg',(req,res) => {
    console.log("req", req.body);
    var body = req.body;

    //TODO : 로그인한 정보 넣기
    //TODO : 웹소켓 관련해서 테스트 해보기
    var participant = "test02";

    var sql = "insert into chatTbl(chatroomId, userId, chatMessage) VALUES(?, ?, ?)";
    conn.query(sql, [body.chatroomId, body.userId, body.chatMessage],(err, results) => {
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