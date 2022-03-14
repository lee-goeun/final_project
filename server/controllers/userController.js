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

const jwt = require('jsonwebtoken');
const upload = multer({ dest: 'profile/' });

// 유저 정보
exports.userView = async (req, res) => {
  try {
    // 로그인 정보 유지하는 경우 그 값 대입하기
    const { userId } = req.body;

    // ID 값 갖고 쿼리 조회하기
    const query = 'SELECT * FROM usertbl WHERE userId = ?;';
    db.query(query, [userId], (err, res) => {
      if (err) {
        console.log(err);
      }

      // 잘못 맞춤 재 작성
      // const query = 'SELECT * FROM usertbl WHERE userImg = ?;';
      // db.query(query, (err, res) => {
      //   try {
      // json, html 타입
      const resMimeType = req.accepts(['json', 'html']);

      if (resMimeType === 'json') {
        res.send(req.userId);
      } else if (resMimeType === 'html') {
        // page 위치
        res.render('userView', {
          userId: res[0].userId,
          userNick: res[0].userNick,
          userName: res[0].userName,
          userPhone: res[0].userPhone,
          userEmail: res[0].userEmail,

          // DB 연동할 때 url 주소 값
          // 이미지 라인 profile -> url 해시링크 걸어주는 곳
          // profileImageURL: '/profile/',
        });
      }
      // }
      // catch(err){
      //   console.log(err)
      // }
      // 2번 쿼리 종료
      // })
      // 1번 조건 종료
    });
  } catch (err) {
    console.log(err);
  }
};

// test photo update로 이동예정
exports.updatePhoto = async (req, res) => {
  try {
    const { userImg } = req.body;

    const query = 'SELECT * FROM usertbl WHERE userImg = ?';
    db.query(query, [userImg], (err, res) => {
      //try 미완 test code 끝나면 userUpdate 병합 후 project로 이동
      try {
        // 프로필 사진 업로드
        // const userimage
        '/:userId/profile',
          upload.single('profile'),
          (req, res) => {
            const { userId } = req;
            const { filename } = req.file;
            userId.profileImage = filename;

            res.send('User profile image uploaded.');
          };
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

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

      // 비밀번호 + 정보 업데이트 시간
      const hashedPasword = await bcrypt.hash(userPw, 8);
      const update = new Date();

      // 조건문으로 값 대칭 해주면 전체 입력 받는 값들 쿼리로 저장
      const query =
        'UPDATE usertbl SET userPw=?, userEmail=?, userPhone=?, userName=?, userNick=?, zonecode=?, address=? ,upDate=?';
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
          update,
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

// 유저 삭제 버튼 클릭시 deleted 값 부여 로그아웃 이후에 로그인 시 delted이 1이면 로그인 불가 -> 로그인에서 여유되면 데이터 테이블 따로 빼서 보관까지
exports.userDelete = (req, res) => {
  try {
    const { userId } = req.body;

    const query = 'INSERT INTO usertbl(deleted) VALUES(1)';
    db.query(query, [userId], (err) => {
      if (err) {
        console.log(err);
      }
    });
    // logout 처리 해줘야하는 곳
    res.send('user delete');
  } catch (err) {
    console.log(err);
  }
};
