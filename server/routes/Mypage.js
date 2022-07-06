const express = require("express");
const conn = require("../db/index");
const router = express.Router();
const { json } = require("body-parser");

//파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');
const Post = require("../models/Post");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'petImages/temp'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload = multer({ storage: storage });

//나의 애완동물(조회)
router.get('/mypetList', (req, res) => {
  var id = req.query.userId;
  var selectPet = req.query.selectPet;
  if(selectPet){
    //선택한 pet이 있으면
    var sql = "select * from mypetTbl where petDeleted = 0 and petId in(?)";
      conn.query(sql,selectPet,(err, results) => {
          if(err) return res.json({success:false, err});
          else{
            chatList = results;
            return res.json(results);
          } 
      });
  }else{
    //id별 모두 조회
    var sql = "select * from mypetTbl where petDeleted = 0 and userId = ? ORDER BY petCreated DESC";
      conn.query(sql,id,(err, results) => {
          if(err) return res.json({success:false, err});
          else{
            chatList = results;
            return res.json(results);
          } 
      });
  }
  
})

//이미지 읽어오는 경로
router.get('/petDownload', (req, res) => {
  var id = req.query.petId;
  var img = req.query.petImgName;

  fs.readFile('petImages/' + id + '/' + img, function (err, results) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(results);
  });
});

//나의 애완동물(추가)
router.post('/mypetAdd', upload.single('petImgName'), (req, res) => {
  var body = req.body;
  var filename = req.file.originalname;
  console.log("body", body, filename);
 //var userId = req.session.userInfo.userId;

  var sql =
    'insert into mypetTbl(userId, petImgName, petName, petTypeDetail, petType, petBirth, petSex) values(?, ?, ?, ?,?,?,?);';
  conn.query(
    sql,
    [
      body.userId,
      filename,
      body.petName,
      body.petTypeDetail,
      body.petType,
      body.petBirth,
      body.petSex
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        conn.query(
          'SELECT petId FROM mypetTbl ORDER BY petCreated DESC LIMIT 1',
          (err, results) => {
            var petId = results[0].petId;

            var newdir = 'petImages/' + petId + '/';

            if (filename != null && filename != 0) {
              if (!fs.existsSync(newdir)) {
                fs.mkdirSync(newdir);
              }

              var oldPath = 'petImages/temp/' + filename;
              var newPath = newdir + filename;

              fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
                console.log('move success');
              });
            }

            res.json({ status: 'success' });
          }
        );
      }
    }
  );
});

//나의 애완동물(수정)
router.put('/mypetMod', upload.single('petImgName'), (req, res) => {
  var body = req.body;
  var filename = req.file.originalname;
  console.log("body", body, filename);

  var sql =
    'UPDATE mypetTbl set petName=?, petTypeDetail=?, petType=?, petBirth=?, petSex=?, petImgName=? where petId=?;';
  conn.query(
    sql,
    [
      body.petName,
      body.petTypeDetail,
      body.petType,
      body.petBirth,
      body.petSex,
      filename,
      body.petId
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
            var newdir = 'petImages/' + body.petId + '/';

            if (filename != null && filename != 0) {
              if (!fs.existsSync(newdir)) {
                fs.mkdirSync(newdir);
              }

              var oldPath = 'petImages/temp/' + filename;
              var newPath = newdir + filename;

              fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
                console.log('move success');
              });
            }

            res.json({ status: 'success' });
      }
    }
  );
});

//삭제
router.put('/del/:id', (req, res) => {
  let id = req.params.id;
  var sql = 'UPDATE mypetTbl set petDeleted=1 where petId=?';
  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json({ status: 'success' });
  });
});


//////////////개시물 페이지/////////////////
//나의 일반게시물 가져오기
router.get('/myboard', (req, result) => {
  var userId = req.query.userId;
  conn.query("SELECT boardId, categoryIndex, boardTbl.userId, boardTitle, boardContent, boardStatus, boardGood, boardCreated, boardMod, boardViews, boardDeleted, boardReport, boardSearch, boardImgList, userNick FROM userTbl JOIN boardTbl ON userTbl.userId=boardTbl.userId WHERE boardDeleted=0 AND boardTbl.userId=?",
  userId, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result.status(500).send({
        message:
        err.message || "Some error occurred while retrieving posts."
      });
    } else {
      for (let i = 0; i < res.length; i++) {
        var temp = res[i].boardImgList;
        var templist = temp.split(' ');
        res[i].boardImgList = templist;
        console.log("resi", res[i]);
      } 
      result.send(res);
    }
  });
});

//나의 관심 게시물 가져오기
router.get('/mycollectboard', (req, result) => {
  var userId = req.query.userId;
  conn.query("SELECT boardTbl.boardId, categoryIndex, boardTbl.userId, boardTitle, boardContent, boardStatus, boardGood, boardCreated, boardMod, boardViews, boardDeleted, boardReport, boardSearch, boardImgList, userNick FROM boardCollectTbl JOIN (boardTbl JOIN userTbl ON userTbl.userId=boardTbl.userId) ON boardTbl.boardId=boardCollectTbl.boardId WHERE boardDeleted=0 AND boardTbl.userId=?",
  userId, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result.status(500).send({
        message:
        err.message || "Some error occurred while retrieving posts."
      });
    } else {
      for (let i = 0; i < res.length; i++) {
        var temp = res[i].boardImgList;
        var templist = temp.split(' ');
        res[i].boardImgList = templist;
        console.log("resi", res[i]);
      } 
      result.send(res);
      // conn.query('SELECT userNick FROM userTbl WHERE userId=?', userId, (req, data) => {
        
      // })
      
    }
  })
})

//신고 게시물 가져오기
router.get('/reportboard', (req, result) => {
  var userId = req.query.userId;
  conn.query("SELECT * FROM boardReportTbl",
  (err, res) => {
    if(err) {
      console.log("error: ", err);
      result.status(500).send({
        message:
        err.message || "Some error occurred while retrieving posts."
      });
    } else {
      result.send(res);
    }
  });
});

//신고 댓글 가져오기
router.get('/reportcomment', (req, result) => {
  conn.query("SELECT * FROM commentReportTbl",
  (err, res) => {
    if(err) {
      console.log("error: ", err);
      result.status(500).send({
        message:
        err.message || "Some error occurred while retrieving posts."
      });
    } else {
      result.send(res);
    }
  });
});

module.exports = router;