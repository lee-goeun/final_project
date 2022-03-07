const express = require('express');
const conn = require('../db/index');
const router = express.Router();
const { json } = require('body-parser');


//파일 업로드용 미들웨어
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'marketImages/temp'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload = multer({ storage: storage });

//조회(검색, 관심도 높은 순)
router.get('/list', (req, res) => {
  let keyword = req.query.keyword;
  console.log('###########', keyword);

  var sql = '';
  if (keyword == undefined) {
    sql = 'select * from marketTbl where marketDeleted = 0';
    conn.query(sql, (err, results) => {
      if (err) return res.json({ success: false, err });
      else return res.json(results);
    });
  } else {
    keyword = '%' + keyword + '%';
    sql =
      'select * from marketTbl where marketDeleted = 0 and (marketTitle like ? or marketContent like ?)';

    conn.query(sql, [keyword, keyword], (err, results) => {
      if (err) return res.json({ success: false, err });
      else return res.json(results);
    });
  }
});

//조회(조회수 높은순)
router.get('/viewCountList', (req, res) => {
  var sql =
    'select * from marketTbl where marketDeleted = 0 ORDER BY marketViews;';
  conn.query(sql, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//추가
router.post('/add', upload.single('marketImgName'), (req, res) => {
  console.log('req', req.file);
  var userId = "";  
  jwt.verify(req.body.token, process.env.JWT_SECRET, function(err,decode){
    userId = decode.userId;
  });
  
  var body = req.body;
  var filename = req.file.originalname;

  var sql =
    'INSERT INTO marketTbl(userId, marketmgName, marketTitle, marketContent, price) VALUES(?,?,?,?,?);';
  conn.query(
    sql,
    [
      userId,
      filename,
      body.marketTitle,
      body.marketContent,
      body.price
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        conn.query(
          'SELECT marketId FROM marketTbl ORDER BY marketCreated DESC LIMIT 1',
          (err, results) => {
            var marketId = results[0].marketId;

            var newdir = 'marketImages/' + marketId + '/';

            if (filename != null && filename != 0) {
              if (!fs.existsSync(newdir)) {
                fs.mkdirSync(newdir);
              }

              var oldPath = 'marketImages/temp/' + filename;
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
  var id = req.query.marketId;
  var img = req.query.marketImgName;

  fs.readFile('marketImgName/' + id + '/' + img, function (err, results) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(results);
  });
});

//상세
router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  console.log('id',id);
  var sql = 'select m.marketId, m.userId, m.marketTitle, m.marketContent, m.marketImgName,'+
				'u.userNick'+
				'from marketTbl m left outer join userTbl u on m.userId = u.userId where m.marketDeleted = 0 and m.marketId = ?;';

  conn.query(sql, id, (err, results) => {
    console.log('res', results);
    if (err) return res.json({ success: false, err });
    else{
      return res.json(results);
    }
  });
});

//수정
router.put('/mod', upload.single('marketImgName'), (req, res) => {
  var body = req.body;
  var image = req.file.originalname;
  console.log('req', body, req.file);
  var sql =
    'UPDATE marketTbl set marketImgName=?, marketTitle=?, marketContent=?, price=? where marketId=?';
  conn.query(
    sql,
    [
      image,
      body.marketTitle,
      body.marketContent,
      body.price,
      body.marketId
    ],
    (err, results) => {
      if (err) return res.json({ success: false, err });
      else {
        var newdir = 'marketImages/' + body.marketId + '/';

          if (!fs.existsSync(newdir)) {
            fs.mkdirSync(newdir);
          }

          var oldPath = 'marketImages/temp/' + image;
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
  var sql = 'UPDATE marketTbl set marketDeleted=1 where marketId=?';
  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json({ status: 'success' });
  });
});

//관심목록 추가
router.post('/like', (req, res) => {
  let body = req.body;
  var sql = 'INSERT INTO marketLikeTbl(marketId, userId) VALUES(?,?);';
  conn.query(sql, [body.marketId, body.userId], (err, results) => {
    if(err) return res.json({success: false, err});
    else res.json({status:"success"});
  })
})

//관심목록 삭제
router.post('/delLike', (req, res) => {
  let body = req.body;
  var sql = 'delete from marektLikeTbl where marketId = ? and userId = ?;';
  conn.query(sql, [body.marketId, body.userId], (err, results) => {
    if(err) return res.json({success: false, err});
    else res.json({status:"success"});
  })
})

//물건구매하기
router.post('/selling', (req, res) => {
  //userId : 판매한사람
  //sellerId : 구매한사람
  let body = req.body;
  var sql = 'insert into marketSaleTbl(marketId, userId, sellerId) values(?,?,?)';
  conn.query(sql,[body.marketId, body.userId, body.sellerId], (err, results)=> {
    if(err) return res.json({success:false, err});
    else{

      //가격조회하기
      var selectPrice = 'select price from marketTbl where marketId = ?';
      conn.query(selectPrice, body.marketId, (err, price) => {
      try{

        conn.beginTransaction();

        //판매자 = balance + price;
        //구매자 = balance - price; 
        conn.query('update userTbl set balance+? where userId=?',[price, userId]);
        conn.query('update userTbl set balance-? where userId=?',[price, sellerId]);
        conn.query('update marketTbl set isSale = 1;');

        conn.commit();
        return res.json({status:"success"});
      }catch(err){

        console.log('transaction err : ' + err);
        conn.rollback();
        return res.status(500).json(err);

      }finally{
        conn.release();
      }
      })
      
    }
  })
})

//배송조회(관리자용)
router.get('/delivery', (req, res) => {
    var sql = 'select * from marketSaleTbl';
    conn.query(sql,(err, results) => {
      if(err) return res.json({success:false,err});
      else{
        results.forEach(item => {
          const userAddress = conn.query('select address from userTbl where userId=?', item.userId);
          const sellerAddress = conn.query('select address from userTbl where userId=?', item.sellerId);

          item.userAddress = userAddress;
          item.sellerAddress = sellerAddress;
        })
        res.json(results);
      };
    })
})

module.exports = router;
