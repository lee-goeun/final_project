const mysql = require('mysql');
const multer = require('multer');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const upload = multer({ dest: 'profile/' });

// const userimage = upload.single('profile'), (req, res) => {
//   const { userId } = req
//   const { filename } = req.file
//   userId.profileImage = filename
// }

// 유저 정보 갱신 순차 시작
exports.userUpdate = (req, res) => {
  try {
    // 입력되는 값 없으면 갱신 없이 처리하기 [미완]
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
      userImg,
    } = req.body;

    // ID 확인 쿼리
    const query = 'SELECT * FROM usertbl WHERE userId = ?';
    db.query(query, [userId], async (err, res) => {
      // ID가 없으면 에러
      if (err) {
        console.log(err);
      }

      // 조건문 들어가는 곳
      // 구현 예정 코드 -> 값 입력과 DB값 비교 없으면 db값을 입력받지 못한 defined값에 대입

      // if(res.userImg==userImg){

      // }

      // 비밀번호 + 정보 업데이트 시간
      const hashedPasword = await bcrypt.hash(userPw, 8);
      const update = new Date();

      // 조건문으로 값 대칭 해주면 전체 입력 받는 값들 쿼리로 저장
      const query =
        'UPDATE usertbl SET userPw=?, userEmail=?, userPhone=?, userName=?, userNick=?, zonecode=?, address=? , detailAddress=? ,upDate=?, userImg=?';
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
          update,
          userImg,
        ],
        (err, res) => {
          try {
            if (err) {
              console.log(err);
            }
          } catch (err) {
            console.log(err);
          }
        }
      );
    });
    // 끝나고 반환 코드 달아줄 곳
    res.send('update');
  } catch (err) {
    console.log(err);
  }
};

// 데이터 옮기기
exports.userDelete = (req, res) => {
  try {
    const { userId } = req.body;

    // const userDelete = true;

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
