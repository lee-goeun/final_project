const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// 유저 정보 갱신 순차 시작 [이미지 제외하고 작업하기 우선]
exports.userUpdate = (req, res) => {
  try {
    const {
      userId,
      userPw,
      userEmail,
      userPhone,
      userName,
      userNick,
      region1,
      region2,
      region3,
      zonecode,
      address,
      detailAddress,
      info,
    } = req.body;
    // ID 확인 쿼리

    const query = 'SELECT * FROM usertbl WHERE userId = ?';
    db.query(query, [userId], async (err, res) => {
      if (err) {
        console.log(err);
      }
      const hashedPasword = await bcrypt.hash(userPw, 8);
      const query =
        'UPDATE usertbl SET userPw=?, userEmail=?, userPhone=?, userName=?, userNick=?, region1=?,region2=?,region3=?,zonecode=?, address=?, detailAddress=?, info=? WHERE userId=?;';
      db.query(
        query,
        [
          hashedPasword,
          userEmail,
          userPhone,
          userName,
          userNick,
          region1,
          region2,
          region3,
          zonecode,
          address,
          detailAddress,
          info,
          userId,
        ],
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log(res);
          }
        }
      );
    });
    // 끝나고 반환 코드 달아줄 곳
    return res.json('update');
  } catch (err) {
    console.log(err);
  }
};

// 데이터 옮기기
exports.userDelete = (req, res) => {
  try {
    const { userId } = req.body;
    const query = 'UPDATE usertbl SET deleted=1 WHERE userId=?';
    db.query(query, [userId], (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.json('deleted');
  } catch (err) {
    console.log(err);
  }
};
