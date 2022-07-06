const express = require('express');
const conn = require('../db/index');
const router = express.Router();
const { json } = require('body-parser');

const crypto = require('crypto');

//파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');

var matchStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'matchImages/temp'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

var ocrStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ocrImages'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const matchUpload = multer({ storage: matchStorage });
const ocrUpload = multer({ storage: ocrStorage });

//조회(검색)
router.get('/list', (req, res) => {
  let keyword = req.query.keyword;
  console.log('###########', keyword);

  var sql = '';
  if (keyword == 'undefined' || keyword == '') {
    sql = 'select * from matchTbl where matchDeleted = 0 ORDER BY matchCreated DESC';
    conn.query(sql, (err, results) => {
      if (err) return res.json({ success: false, err });
      else return res.json(results);
    });
  } else {
    keyword = '%' + keyword + '%';
    sql =
      'select * from matchTbl where matchDeleted = 0 and (matchTitle like ? or matchContent like ? or region1 like ? or region2 like ? or region3 like ?) ORDER BY matchCreated DESC';

    conn.query(sql, [keyword, keyword, keyword, keyword, keyword], (err, results) => {
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

//조회(마이페이지 > 나의 게시물)
router.get('/myList/:id', (req, res) => {
  const id = req.params.id;
  var sql =
    'select * from matchTbl where userId = ? and matchDeleted = 0;';
  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//추가
router.post('/add', matchUpload.single('matchImgName'), (req, res) => {
  console.log('req', req.file);
  console.log('req', req.headers);
  console.log('req', req.body);
  //const token = req.cookies.jwt;
  var userId = '';
  jwt.verify(req.body.token, process.env.JWT_SECRET, function (err, decode) {
    console.log('ssss', decode);
    userId = decode.userId;
  });

  //console.log('tokenResult', tokenResult);
  var body = req.body;
  if(req.file){ 
    var filename = req.file.originalname;
  }
  var sql =
    'INSERT INTO matchTbl(userId, matchImgName, matchTitle, matchContent, selectPet, matchTime, region1, region2, region3) VALUES(?, ?, ?, ?,?,?,?,?,?);';
  conn.query(
    sql,
    [
      userId,
      filename,
      body.matchTitle,
      body.matchContent,
      body.selectPet,
      body.matchTime,
      body.region1,
      body.region2,
      body.region3,
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

//신분확인(ocr기능)
router.get('/confirmId', ocrUpload.single('idCard'), (req, res) => {
  console.log('req', req.file);
  //이미지 인코딩
  let readFile = fs.readFileSync(req.file.path);
  let encode = Buffer.from(readFile).toString('base64');

  const apiURL =
    'https://yc2zdolfbc.apigw.ntruss.com/custom/v1/14471/4d0fecd9abbb9baf72dc48c4317fdff307aec28cc83e268e49b6cc94c1cd13de/infer';

  axios({
    method: 'post',
    url: apiURL,
    headers: {
      'Content-Type': 'application/json',
      'X-OCR-SECRET': 'aURGRmpuSlJSdFZaanNsU3NmbHBhSmlWTWVOaFNXb3Q=',
    },
    data: {
      version: 'V1',
      requestId: 'string',
      timestamp: 0,
      lang: 'ko',
      images: [
        {
          format: 'jpg',
          name: req.file.fieldname,
          data: encode,
          templateIds: [13997],
        },
      ],
    },
  })
    .then((ocrRes) => {
      const idNumber = ocrRes.data.images[0].fields[1].inferText;
      const idNumArr = idNumber.split('-');

      console.log(idNumArr[1].substring(0, 1));
      //유효성검사영역 : title, 주민번호 길이, 주민번호 앞자리 뒷자리 길이, 성별(0 || 1)
      if (
        ocrRes.data.images[0].title.name == '주민등록증' &&
        idNumber.length == 14 &&
        idNumArr[0].length == 6 &&
        idNumArr[1].length == 7 &&
        (idNumArr[1].substring(0, 1) == 1 || idNumArr[1].substring(0, 1) == 2)
      ) {
        return res.json({
          status: 'valid',
          name: ocrRes.data.images[0].fields[0].inferText.substring(0, 3),
          birth: idNumArr[0],
          sex: idNumArr[1].substring(0, 1),
          address: ocrRes.data.images[0].fields[2].inferText,
        });
      } else {
        return res.json({ status: 'invalid' });
      }
    })
    .catch((ocrRes) => {
      console.log('err');
    });
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
  console.log('id',id);
  var sql = 'select m.matchId, m.userId, m.matchTitle, m.matchContent, m.matchTime, m.region1, m.region2, m.region3, m.matchImgName, m.selectPet,'+
				'u.userNick, u.userAge, u.userSex '+
				'from matchTbl m left outer join userTbl u on m.userId = u.userId where m.matchDeleted = 0 and m.matchId = ?;';

  conn.query(sql, id, (err, results) => {
    console.log('res', results);
    if (err) return res.json({ success: false, err });
    else{
      //선택한 반려동물
      const selectPet = results[0].selectPet;
      console.log('see', selectPet);
      var sql2 = "select * from mypetTbl where petId in (?)";
        conn.query(sql2,selectPet,(err2, results2) => {
            if(err2) return res.json({success:false, err});
            else{
              console.log('res',results2);
              results[0].selectPets = results2;
              return res.json(results);
            } 
        });
    }
  });
});

//수정
router.put('/mod', matchUpload.single('matchImgName'), (req, res) => {
  var body = req.body;
  if(req.file){
    var image = req.file.originalname;
  }
  console.log('req', body, req.file);
  var sql =
    'UPDATE matchTbl set matchImgName=?, matchTitle=?, matchContent=?, selectPet=?, matchTime=? where matchId=?';
  conn.query(
    sql,
    [
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

        if (!fs.existsSync(newdir)) {
          fs.mkdirSync(newdir);
        }

        if(image){
          var oldPath = 'matchImages/temp/' + image;
          var newPath = newdir + image;

          fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log('move success');
          });
        }
        

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
