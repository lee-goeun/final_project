var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

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
    userAge,
    userSex,
    userImg,
  } = req.body;
  // 사용자 아이디가 존재하는지 확인
  const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.log(err);
    }

    // 비밀번호 값 암호화
    const hashedPasword = await bcrypt.hash(userPw, 8);
    const regDate = new Date();

    // 아이디, 닉네임, 핸드폰 번호, 우편번호, 주소, 지역(시도), 지역(구), 지역(동), 상세주소, 추가주소, 이름, 이메일, 암호화 비밀번호[기존 비밀번호랑 대조], 체크박스 유효성 검사 필요합니다
    db.query(
      'INSERT INTO usertbl set ?',
      {
        userId: userId,
        userNick: userNick,
        userPhone: userPhone,
        zonecode: zonecode,
        address: address,
        region1: region1,
        region2: region2,
        region3: region3,
        detailAddress: detailAddress,
        extraAddress: extraAddress,
        userName: userName,
        userEmail: userEmail,
        userPw: hashedPasword,
        userAge: userAge,
        locationAgree: true,
        serviceAgree: true,
        userSex: userSex,
        regDate,
        userImg: '/defaultPhoto/defalut.png',
        pwAuth: hashedPasword,
      },
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          res.json({ status: 'success' });
        }
      }
    );
  });
};

exports.auth = (req, res) => {
  const accessToken = req.headers['x-access-token'];
  const query = 'SELECT * FROM usertbl WHERE userId = ?';

  if (!accessToken) {
    res.send({ auth: false, message: 'need a token' });
  } else {
    verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'U failed to authenticate' });
      } else {
        const userId = decoded.userId;
        db.query(query, [userId], (error, result) => {
          if (err) throw err;
          else {
            res.send({
              auth: true,
              userId: result[0].userId,
              userNick: result[0].userNick,
              userEmail: result[0].userEmail,
              userName: result[0].userName,
              //필요한 유저정보 여기다 추가
              region1: result[0].region1,
              region2: result[0].region2,
              region3: result[0].region3,
              balance: result[0].balance,
              deleted: result[0].deleted,
            });
          }
        });
      }
    });
  }
};

exports.login = (req, res) => {
  postLoginModel(req)
    .then(
      ({
        accessToken,
        userId,
        userNick,
        userEmail,
        userName,
        region1,
        region2,
        region3,
      }) => {
        res.send({
          auth: true,
          accessToken,
          userId,
          userNick,
          userEmail,
          userName,
          region1,
          region2,
          region3,
        });
      }
    )
    .catch((passwordError) =>
      res.send({ auth: false, message: passwordError.message })
    )
    .catch((notMatchedAccountError) =>
      res.send({ auth: false, message: notMatchedAccountError.message })
    );
};

const createToken = ({ userId }) => {
  const accessToken = sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });
  return accessToken;
};

const postLoginModel = (req) => {
  const { userId, userPw } = req.body;
  const query = 'SELECT * FROM usertbl WHERE userId = ?';

  return new Promise((resolve, reject) => {
    db.query(query, [userId], (error, result) => {
      if (error) {
        throw error;
      }

      if (result.length > 0) {
        bcrypt.compare(userPw, result[0].userPw, (err, match) => {
          if (match) {
            const {
              userId,
              userNick,
              userEmail,
              userName,
              region1,
              region2,
              region3,
            } = result[0];
            const accessToken = createToken({
              userId,
            });
            //성공시 accessToken,유저정보 전송
            resolve({
              accessToken,
              userId,
              userNick,
              userEmail,
              userName,
              region1,
              region2,
              region3,
            });
          } else {
            reject(new Error('Wrong password'));
          }
        });
      } else {
        reject(new Error('Wrong account'));
      }
    });
  });
};

exports.idCheck = (req, res) => {
  console.log(req.body);
  try {
    const { userId } = req.body;
    const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
    db.query(query, [userId], async (err, res) => {
      if (err) {
        console.log('존재하는 아이디입니다. test');
      } else {
        // res.send('사용가능');
        // res.json({ status: 'success' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.ncikCheck = (req, res) => {
  console.log(req.body);
  try {
    const { userNick } = req.body;
    const query = 'SELECT * FROM usertbl WHERE userNick = ?;';
    db.query(query, [userNick], async (err, res) => {
      if (err) {
        console.log('존재하는 닉네임입니다. test');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.emailCheck = (req, res) => {
  console.log(req.body);
  try {
    const { userEmail } = req.body;
    const query = 'SELECT * FROM usertbl WHERE userEmail = ?;';
    db.query(query, [userEmail], async (err, res) => {
      if (err) {
        console.log('존재하는 이메일입니다. test');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
