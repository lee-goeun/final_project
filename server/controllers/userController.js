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
      zonecode,
      address,
      detailAddress,
      info,
    } = req.body;
    // ID 확인 쿼리

    const query = 'SELECT * FROM usertbl WHERE userId = ?';
    db.query(query, [userId], async (err, res) => {
      // ID가 없으면 에러
      if (err) {
        console.log(err);
      }
      // console.log(userId); // 됨

      // console.log('test'); //

      // 비밀번호 + 정보 업데이트 시간
      const hashedPasword = await bcrypt.hash(userPw, 8);
      const update = new Date();

      console.log('test'); // 여기까지 진입됨

      // 조건문으로 값 대칭 해주면 전체 입력 받는 값들 쿼리로 저장
      const query =
        'UPDATE usertbl SET userPw=?, userEmail=?, userPhone=?, userName=?, userNick=?, zonecode=?, address=?, detailAddress=? , info=? WHERE userId=?;';
      db.query(
        query,
        [
          hashedPasword,
          userEmail,
          userPhone,
          userName,
          userNick,
          zonecode,
          address,
          detailAddress,
          info,
          // update,
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
