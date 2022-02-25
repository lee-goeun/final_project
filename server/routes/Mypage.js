const express = require("express");
const conn = require("../db/index");
const router = express.Router();
const { json } = require("body-parser");

//파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');

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
  var sql = "select * from mypetTbl where petDeleted = 0 and userId = ?";
      conn.query(sql,id,(err, results) => {
          if(err) return res.json({success:false, err});
          else{
            chatList = results;
            return res.json(results);
          } 
      });
})

//나의 애완동물(추가)
router.post('/mypetAdd', upload.single('petImgName'), (req, res) => {
  var body = req.body;
  var filename = req.file.originalname;
  console.log("body", body, filename);

  var sql =
    'insert into mypetTbl(userId, petImgName, petName, petTypeDetail, petType, petBirth, petSex) values(?, ?, ?, ?,?,?,?);';
  conn.query(
    sql,
    [
      'test01',
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

module.exports = router;