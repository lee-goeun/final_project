var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.join = (req, res) => {
  console.log(req.body);

  const {
    userId,
    userNick,
    userPhone,
    zonecode,
    address,
    region1,
    region2,
    region3,
    detailAddress,
    extraAddress,
    userName,
    userEmail,
    userPw,
  } = req.body;
  // 사용자 아이디가 존재하는지 확인
  const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.log(err);
    }

    // 비밀번호 값 암호화
    let hashedPasword = await bcrypt.hash(userPw, 8);
    console.log(hashedPasword);
    // const create = Now(); , regDate:create

    // 아이디, 닉네임, 핸드폰 번호, 우편번호, 주소, 지역(시도), 지역(구), 지역(동), 상세주소, 추가주소, 이름, 이메일, 암호화 비밀번호[기존 비밀번호랑 대조]
    db.query(
      'INSERT INTO usertbl set ?',
      {
        userId: userId,
        userNick: userNick,
        userPhone: userPhone,
        zonecode: zonecode,
        address: address,
        region1:region1,
        region2:region2,
        region3:region3,
        detailAddress: detailAddress,
        extraAddress: extraAddress,
        userName: userName,
        userEmail: userEmail,
        userPw: hashedPasword,
      },
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          // 성공적으로 등록
          console.log(results);
        //  res.redirect('/');
          res.json({status:'success'});
        }
      }
    );
  });
};

exports.login = async (req, res) => {
  try {
    const { userId, userPw } = req.body;
    // 아이디와 비밀번호 체크
    if (!userId || !userPw) {
      return res.status(400).render('login', {
        message: '아이디와 비밀번호를 입력해주세요',
      });
    }
    // usertbl 유저 테이블에서 userId 값 지정
    const query = 'SELECT * FROM usertbl WHERE userId = ?;';
    db.query(query, [userId], async (error, results) => {
      if (!results || !(await bcrypt.compare(userPw, results[0].userPw))) {
        res.status(401).render('login', {
          message: '아이디 또는 비밀번호가 잘못됐습니다',
        });
      } else {
        var userId = results[0].userId;
        // 로그인 유지 토큰 값 지정
        var token = jwt.sign({ userId : userId }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
            req.session.userInfo = results[0];
            req.session.isLogined = true;
            //세션 스토어가 이루어진 후 redirect를 해야함.
            //req.session.save(function(){                               
              //res.redirect('/');
            //});

        console.log('The Token is : ' + token);
        var cookieOptions = {
          expires: new Date(
            // 시간 배정
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        res.cookie('jwt', token, cookieOptions);
        res.json({status:'success', token : token});
       // res.status(200).redirect('/');
        
      }
    });
  } catch (error) {
    console.log(error);
  }
};
