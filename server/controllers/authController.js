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
      },
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          // 성공적으로 등록
          console.log(results);
          //  res.redirect('/');
          res.json({ status: 'success' });
        }
      }
    );
  });
};
// exports.auth = async (req, res) => {
//   const query = 'select * from userTbl where userId = ?';

//   //get token in client's cookie

//   console.log('req', req.query);
//   let token = req.query.token;
//   jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//     if (err) throw err;
//     if (!decoded) return res.json({ isAuth: false, err: true });
//     else {
//       //decode token and find user
//       db.query(query, decoded.userId, async (err, results) => {
//         if (err) throw err;
//         else {
//           results[0].isAuth = true;
//           delete results[0].userPw;
//           console.log('results', results);
//           res.status(200).json(results[0]);
//         }
//       });
//     }
//   });
// };

exports.auth = (req, res) => {
  const accessToken = req.headers['x-access-token'];
  const query = 'SELECT * FROM usertbl WHERE userId = ?';

  if (!accessToken) {
    res.send('need a token');
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
              // region1: result[0].region1,
              // region2: result[0].region1,
              // region3: result[0].region1,
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

// exports.login = async (req, res) => {
//   try {
//     const { userId, userPw } = req.body;
//     // 아이디와 비밀번호 체크
//     if (!userId || !userPw) {
//       return res.status(400).render('login', {
//         message: '아이디와 비밀번호를 입력해주세요',
//       });
//     }
//     // usertbl 유저 테이블에서 userId 값 지정
//     const query = 'SELECT * FROM usertbl WHERE userId = ?;';
//     db.query(query, [userId], async (error, results) => {
//       if (!results || !(await bcrypt.compare(userPw, results[0].userPw))) {
//         res.status(401).render('login', {
//           message: '아이디 또는 비밀번호가 잘못됐습니다',
//         });
//       } else {
//         var userId = results[0].userId;
//         // 로그인 유지 토큰 값 지정
//         var token = jwt.sign(
//           {
//             userId: userId,
//             region1: results[0].region1,
//             region2: results[0].region2,
//             region3: results[0].region3,
//           },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: process.env.JWT_EXPIRES_IN,
//           }
//         );

//         console.log('The Token is : ' + token);
//         var cookieOptions = {
//           expires: new Date(
//             // 시간 배정
//             Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//           ),
//           httpOnly: true,
//         };

//         res.cookie('jwt', token, cookieOptions).status(200).json({
//           success: true,
//           userId: userId,
//           token: token,
//         });
//         // res.json({status:'success', token : token});
//         // res.status(200).redirect('/');
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
