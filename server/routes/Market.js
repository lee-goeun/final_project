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
//TODO : 조회 더 간단하게 분기하는 방법 찾아보기
//조회(검색, 관심도 높은 순)
router.get('/list', (req, res) => {
  console.log('query', req.query);
  let keyword = req.query.keyword;
  let order = req.query.order;
  let userId = req.query.userId;
  console.log('query', keyword, order, userId);
  var sql = '';
  //관심도 높은 순
  if(order == 'like'){
    var sql =
      'select * '+
      'from ( ' +
        'select m.marketId, m.userId, m.marketTitle, m.price, m.marketCreated, m.isSale, m.marketDeleted, m.marketImgName, m.marketViews, ' + 
        'l.isLike, l2.likeCnt '+
        'from marketTbl m left outer join (select marketId, IFNULL(1, 0) as isLike from marketLikeTbl where userId = ?) as l on m.marketId = l.marketId ' +
        'left outer join (select marketId, count(distinct userId) as likeCnt from marketLikeTbl group by marketId) as l2 on m.marketId = l2.marketId ' +
        'where m.marketDeleted = 0 ) as T1 ORDER BY likeCnt DESC;';
    conn.query(sql, userId, (err, results) => {
      console.log('res', results);
      if (err) return res.json({ success: false, err });
      else res.json(results);
    });
  //생성날짜 순
  }else{
    if (keyword == undefined || keyword == 'undefined' ||keyword == '') {
      sql = 'select * '+
      'from ( ' +
        'select m.marketId, m.userId, m.marketTitle, m.price, m.marketCreated, m.isSale, m.marketDeleted, m.marketImgName, m.marketViews, ' + 
        'l.isLike ' +
        'from marketTbl m left outer join (select marketId, IFNULL(1, 0) as isLike from marketLikeTbl where userId = ?) as l on m.marketId = l.marketId ' +
        'where m.marketDeleted = 0 ) as T1 ORDER BY marketCreated DESC;';
      conn.query(sql, userId, (err, results) => {
        console.log('res', results);
        if (err) return res.json({ success: false, err });
        else return res.json(results);
      });
    } else {
      keyword = '%' + keyword + '%';
      sql =
      'select * '+
      'from ( ' +
        'select m.marketId, m.userId, m.marketTitle, m.price, m.marketCreated, m.isSale, m.marketDeleted, m.marketImgName, m.marketViews, ' + 
        'l.isLike ' +
        'from marketTbl m left outer join (select marketId, IFNULL(1, 0) as isLike from marketLikeTbl where userId = ?) as l on m.marketId = l.marketId ' +
        'where m.marketDeleted = 0  and (marketTitle like ? or marketContent like ?) ) as T1 ORDER BY marketCreated DESC;';
      conn.query(sql, [userId, keyword, keyword], (err, results) => {
        if (err) return res.json({ success: false, err });
        else return res.json(results);
      });
    }
}
});

//조회(조회수 높은순)
router.get('/viewCountList', (req, res) => {
  var sql =
    'select * from marketTbl where marketDeleted = 0 ORDER BY marketViews DESC;';
  conn.query(sql, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//조회(마이페이지 > 나의 게시물)
router.get('/myList/:id', (req, res) => {
  const id = req.params.id;
  var sql =
    'select * from marketTbl where userId = ? and marketDeleted = 0;';
  conn.query(sql, id, (err, results) => {
    if (err) return res.json({ success: false, err });
    else res.json(results);
  });
});

//조회(마이페이지 > 관심 게시물)
router.get('/myLikeList/:id', (req, res) => {
  const id = req.params.id;
  console.log('id', id);
  var sql =
    'select m.marketId, m.userId, m.marketTitle, m.marketContent, m.marketImgName, m.marketViews from marketTbl m left outer join ( select userId, marketId from marketLikeTbl ) as l on m.marketId = l.marketId where m.marketDeleted = 0 and l.userId = ? ;';
  conn.query(sql, id, (err, results) => {
    console.log('resssssssssssssss', results);
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
    'INSERT INTO marketTbl(userId, marketImgName, marketTitle, marketContent, price) VALUES(?,?,?,?,?);';
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
  console.log("id", id ,"img", img);

  fs.readFile('marketImages/' + id + '/' + img, function (err, results) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(results);
  });
});

//상세
router.get('/detail/:id', (req, res) => {
  let id = req.params.id;
  console.log('id',id);
  
  var sql= 'select m.marketId, m.userId, m.marketTitle, m.marketContent, m.price, m.marketImgName, u.userNick '+
				'from marketTbl m left outer join userTbl u on m.userId = u.userId where m.marketDeleted = 0 and m.marketId = ?;';
  conn.query(sql, id, (err, results1) => {
    if (err) return res.json({ success: false, err });
    else{
      conn.query('update marketTbl set marketViews = marketViews + 1 where marketId = ?', id);
      return res.json(results1);
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
  var sql1 = 'SELECT * FROM marketLikeTbl WHERE marketId = ? and userId = ?';
  conn.query(sql1, [body.marketId, body.userId], (err1, results1) => {
    if(err1) return res.json({success:false}, err1);
    else{
      console.log('resulst2', results1);
      if(results1.length == 0){
        var sql2 = 'INSERT INTO marketLikeTbl(marketId, userId) VALUES(?,?);';
        conn.query(sql2, [body.marketId, body.userId], (err2, results2) => {
          console.log('restul1', results2);
          if(err2) return res.json({success: false, err2});
          else res.json({status:"success"});
        })
      }
    }
  }) 
  
})

//관심목록 삭제
router.post('/delLike', (req, res) => {
  let body = req.body;
  var sql = 'delete from marketLikeTbl where marketId = ? and userId = ?;';
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
  console.log('body', body);
  var sql = 'insert into marketSaleTbl(marketId, userId, sellerId) values(?,?,?)';
  conn.query(sql,[body.marketId, body.userId, body.sellerId], (err, results)=> {
    if(err) return res.json({success:false, err});
    else{

      //가격조회하기
      var selectPrice = 'select price from marketTbl where marketId = ?';
      conn.query(selectPrice, body.marketId, (err, results2) => {
      try{
        const price = results2[0].price;
        conn.beginTransaction();

        //판매자 = balance + price;
        //구매자 = balance - price; 
        conn.query('update userTbl set balance=balance+? where userId=?',[price, body.userId]);
        conn.query('update userTbl set balance=balance-? where userId=?',[price, body.sellerId]);
        conn.query('update marketTbl set isSale = 1 where marketId=?;',[body.marketId]);

        conn.commit();
        return res.json({status:"success"});
      }catch(err){

        console.log('transaction err : ' + err);
        conn.rollback();
        return res.status(500).json(err);

      }finally{
        //TODO : 나중에 이거 뭐가 문제인지 찾아보기
        //conn.release();
      }
      })
      
    }
  })
})

const address = (id) => {
  conn.query('select address from userTbl where userId=?', id,(err, result) => {
    if(err) return err;
    else
      return result[0].address;
  })
}


//배송조회(관리자용)
router.get('/delivery', (req, res) => {
    var sql = 'select  m.saleId, m.marketId, m.userId, m.sellerId, u1.address as userAddress, u2.address as sellerAddress from marketSaleTbl m left outer join userTbl u1 on u1.userId = m.userId left outer join userTbl u2 on u2.userId = m.sellerId;';
    conn.query(sql,(err, results) => {
      if(err) return res.json({success:false,err});
      else{
        res.json(results);
      };
    })
})


module.exports = router;
