const express = require('express');
const conn = require('../db/index');
const router = express.Router();
const { json } = require('body-parser');

//파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'matchImages/temp'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload = multer({ storage: storage });

//조회(검색)
router.get('/list', (req, res) => {
  let keyword = req.query.keyword;
  console.log('###########', keyword);

  var sql = '';
  if (keyword == undefined) {
    sql = 'select * from matchTbl where matchDeleted = 0';
    conn.query(sql, (err, results) => {
      if (err) return res.json({ success: false, err });
      else return res.json(results);
    });
  } else {
    keyword = '%' + keyword + '%';
    sql =
      'select * from matchTbl where matchDeleted = 0 and (matchTitle like ? or matchContent like ?)';

    conn.query(sql, [keyword, keyword], (err, results) => {
      if (err) return res.json({ success: false, err });
      else return res.json(results);
    });
  }
});

//조회(1시간이내)
router.get('/listLimit1', (req, res) => {
  var sql =
    'select * from matchTbl where matchDeleted = 0 and matchTime between now() and  DATE_ADD(now(), INTERVAL +1 HOUR) order by matchTime;';

  conn.query(sql, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//추가
router.post('/add', upload.single('matchImgName'), (req, res) => {
  var body = req.body;
  var filename = req.file.originalname;

  var sql =
    'INSERT INTO matchTbl(user_id, matchImgName, matchTitle, matchContent, selectPet, matchTime) VALUES(?, ?, ?, ?,?, ?);';
  conn.query(
    sql,
    [
      'test01',
      filename,
      body.matchTitle,
      body.matchContent,
      body.selectPet,
      body.matchTime,
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        conn.query(
          'SELECT matchId FROM matchTbl ORDER BY matchCreated DESC LIMIT 1',
          (err, results) => {
            var matchId = results[0].matchId;

            var newdir = 'matchImages/' + matchId + '/';

            if (filename != null && filename != 0) {
              if (!fs.existsSync(newdir)) {
                fs.mkdirSync(newdir);
              }

              var oldPath = 'matchImages/temp/' + filename;
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

//이미지 읽어오는 경로
router.get('/download', (req, res) => {
  var id = req.query.matchId;
  var img = req.query.matchImgName;

  fs.readFile('matchImages/' + id + '/' + img, function (err, results) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(results);
  });
});

//상세
router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  var sql = 'select * from matchTbl where matchId = ?';

  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//수정
router.put('/mod', upload.single('matchImgName'), (req, res) => {
<<<<<<< HEAD
  var body = req.body;
  var image = req.file.originalname;
  console.log('req', body, req.file);
  var sql =
    'UPDATE matchTbl set matchImgName=?, matchTitle=?, matchContent=?, selectPet=?, matchTime=? where matchId=?';
  conn.query(
    sql,
    [
      'test01',
      image,
      body.matchTitle,
      body.matchContent,
      body.selectPet,
      body.matchTime,
      body.matchId,
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        var newdir = 'matchImages/' + body.matchId + '/';
=======
    var body = req.body;
    var image = req.file.originalname;
    console.log("req", body, req.file);
    var sql = "UPDATE matchTbl set matchImgName=?, matchTitle=?, matchContent=?, selectPet=?, matchTime=? where matchId=?";
    conn.query(sql, [image, body.matchTitle, body.matchContent, body.selectPet, body.matchTime, body.matchId],(err, results) => {
        if(err) return res.json({success:false, err});
        else {
                var newdir = "matchImages/" + body.matchId + "/";
>>>>>>> 117024b122146bb6c43c15379b3f8369afb07bea

        if (!fs.existsSync(newdir)) {
          fs.mkdirSync(newdir);
        }

        var oldPath = 'matchImages/temp/' + image;
        var newPath = newdir + image;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
          console.log('move success');
        });

        //TODO: 이전 이미지 삭제

        res.json({ status: 'success' });
      }
    }
  );
});

//삭제
router.put('/del/:id', (req, res) => {
  let id = req.params.id;
  var sql = 'UPDATE matchTbl set matchDeleted=1 where matchId=?';
  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json({ status: 'success' });
  });
});

module.exports = router;
