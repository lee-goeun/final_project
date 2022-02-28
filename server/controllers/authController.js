var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '1234',
  database: 'papdb',
});

exports.join = (req, res) => {
  console.log(req.body);

  const {
    userId,
    userNick,
    userPhone,
    zonecode,
    address,
    detailAddress,
    extraAddress,
    userName,
    userEmail,
    userPw,
    passwordConfirm,
  } = req.body;
  // 사용자 아이디가 존재하는지 확인
  const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.log(err);
    }

    if (results.length > 0) {
      return res.render('join', {
        message: '해당 이메일은 이미 사용중입니다.',
      });
    } else if (userPw !== passwordConfirm) {
      return res.render('join', {
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    // 비밀번호 값 암호화
    let hashedPasword = await bcrypt.hash(userPw, 8);
    console.log(hashedPasword);
    // const create = Now(); , regDate:create

    // 아이디, 닉네임, 핸드폰 번호, 우편번호, 주소, 상세주소, 추가주소, 이름, 이메일, 암호화 비밀번호[기존 비밀번호랑 대조]
    db.query(
      'INSERT INTO usertbl set ?',
      {
        userId: userId,
        userNick: userNick,
        userPhone: userPhone,
        zonecode: zonecode,
        address: address,
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
          res.redirect('/');
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
        var token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        console.log('The Token is : ' + token);
        var cookieOptions = {
          expires: new Date(
            // 시간 배정
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(200).redirect('/');
      }
    });
  } catch (error) {
    console.log(error);
  }
};