const mysql = require('mysql');
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
    deatilJusoData,
    extraAddress,
    userName,
    userEmail,
    userPw,
    userAge,
    userSex,
    userImg,
  } = req.body;
  /** 사용자 아이디가 존재하는지 확인*/
  const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.log(err);
    }

    /** 비밀번호 값 암호화*/
    const hashedPasword = await bcrypt.hash(userPw, 8);
    const regDate = new Date();

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
        detailAddress: deatilJusoData,
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
        deleted: 0,
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
              userPhone: result[0].userPhone,
              /** 필요한 유저정보 여기다 추가 */
              /** 정보, 우편번호, 주소, 상세주소*/
              info: result[0].info,
              zonecode: result[0].zonecode,
              address: result[0].address,
              detailAddress: result[0].detailAddress,
              extraAddress: result[0].extraAddress,
              region1: result[0].region1,
              region2: result[0].region2,
              region3: result[0].region3,
              userImg: result[0].userImg,
              balance: result[0].balance,
              deleted: result[0].deleted,
              info: result[0].info,
            });
          }
        });
      }
    });
  }
};

exports.login = (req, res) => {
  postLoginModel(req)
    /** 여기에 값 넣어야함  */
    .then(
      ({
        accessToken,
        userId,
        userNick,
        userEmail,
        balance,
        zonecode,
        address,
        detailAddress,
        userName,
        userPhone,
        region1,
        region2,
        region3,
        info,
        deleted,
      }) => {
        res.send({
          auth: true,
          accessToken,
          userId,
          userNick,
          userEmail,
          balance,
          zonecode,
          address,
          detailAddress,
          userName,
          userPhone,
          region1,
          region2,
          region3,
          info,
          deleted,
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

const postLoginModel = (req, callback) => {
  const { userId, userPw } = req.body;
  const query = 'SELECT * FROM usertbl WHERE userId = ?';

  return new Promise((resolve, reject) => {
    db.query(query, [userId], (error, result) => {
      if (error) {
        throw error;
      }

      if (result.length > 0 && result[0].deleted != 1) {
        bcrypt.compare(userPw, result[0].userPw, (err, match) => {
          if (match) {
            const {
              userId,
              userNick,
              userEmail,
              balance,
              address,
              zonecode,
              detailAddress,
              userName,
              userPhone,
              region1,
              region2,
              region3,
              info,
              deleted,
            } = result[0];
            const accessToken = createToken({
              userId,
            });
            /** 성공시 accessToken,유저정보 전송 */
            resolve({
              accessToken,
              userId,
              userNick,
              userEmail,
              balance,
              address,
              zonecode,
              detailAddress,
              userName,
              userPhone,
              region1,
              region2,
              region3,
              info,
              deleted,
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

exports.idCheck = async (req, result) => {
  try {
    const { userId } = req.body;
    let idCheck;
    const query = 'SELECT userId FROM usertbl WHERE userId = ?;';
    await db.query(query, [userId], async (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res[0] != undefined) {
        idCheck = true;
      } else {
        idCheck = false;
      }
      console.log('idcheck', idCheck);
      if (idCheck === false) {
        return result.json(false);
      } else {
        return result.json(true);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.ncikCheck = (req, result, callback) => {
  try {
    const { userNick } = req.body;
    let nickCheck;
    const query = 'SELECT userNick FROM usertbl WHERE userNick = ?;';
    db.query(query, [userNick], async (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res[0] != undefined) {
        nickCheck = true;
      } else {
        nickCheck = false;
      }

      if (nickCheck === false) {
        return result.json(false);
      } else {
        return result.json(true);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.emailCheck = (req, result, callback) => {
  try {
    const { userEmail } = req.body;
    let emailCheck;
    const query = 'SELECT userEmail FROM usertbl WHERE userEmail = ?;';
    db.query(query, [userEmail], async (err, res) => {
      if (err) {
        console.log(err);
      }
      if (res[0] != undefined) {
        emailCheck = true;
      } else {
        emailCheck = false;
      }
      if (emailCheck === false) {
        return result.json(false);
      } else {
        return result.json(true);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
