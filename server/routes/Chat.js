
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const conn = require("../db/index");
const router = express.Router();
const io = require('socket.io')(http);


//웹소켓관련

http.listen(3002, () => console.log('listing on port 3002'));

io.on('connection', socket => {
 // console.log('conection');
  socket.on('send msg', (item) => {
    console.log('ttt', item);
     io.emit('receive msg', {name:item.name,message:item.message});
  });
})

//조회
router.get('/list/:id', (req, res) => {
  console.log('req,', req.params.id, req.query);
  const id = req.params.id;
    var sql = "select c.chatroomId, c.userId, c.participant, c.chatroomCreated, c.chatroomDeleted, u1.userImg, u1.userNick, u2.userImg as participantImg, u2.userNick as participantNick from chatroomTbl c left outer join userTbl u1 on u1.userId = c.userId left outer join userTbl u2 on u2.userId = c.participant where c.chatroomDeleted = 0 and (c.participant = ? or c.userId =?);";
        conn.query(sql, [id, id] , (err, results) => {
            if(err) return res.json({success:false, err});
            else{
              console.log('ersul', results);
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