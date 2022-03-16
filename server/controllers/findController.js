const nodemailer = require('nodemailer');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.findId = async (req, res) => {
  try {
    const { userEmail, userName } = req.body;

    // 임시 코드 -> 정리 필요 부분
    if (req.body.userEmail === '' || req.body.userName === '') {
      res.send('이메일 또는 이름을 입력해 주세요');
    }
    // console.log('test'); 확인

    // Email 기준 조회
    const query = 'SELECT * FROM usertbl WHERE userEmail = ?;';
    db.query(query, [userEmail], (err, result) => {
      // console.log('test'); 확인
      if (err) {
        console.log(err);
      } else {
        // console.log('test'); 확인
        const Id = result[0].userId;

        // 메일 등록
        const transporter = nodemailer.createTransport({
          service: 'naver',
          host: 'smtp.naver.com',
          port: 465,
          secure: false,
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PW,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // 메시지
        const message = {
          from: process.env.EMAIL_ID,
          to: userEmail,
          subject:
            userName + '님 안녕하세요! PaP에서 ID 확인 메일 보내드립니다!',
          html:
            '안녕하세요 ' +
            userName +
            '님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>' +
            userName +
            '님의 아이디는 <b>' +
            Id +
            '</b> 입니다.<br>' +
            '더욱 노력하는 PaP일동이 되겠습니다.',
        };

        // 보내기
        transporter.sendMail(message, (err, res) => {
          if (err) {
            res.json(err);
            return false;
          } else {
            res.json(sucess);
            transporter.close();
            return true;
          }
        });
      }
    });
    // console.log('test'); 확인
    res.json('test');
    // res.json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

// 랜덤 인증번호 만드는 함수
const texts = () => {
  let number = '';
  let random = 0;

  for (let i = 0; i < 8; i++) {
    random = Math.trunc(Math.random() * (10 - 0) + 0);
    number += random;
  }

  return number;
};

// 비밀번호 찾기
exports.findPw = async (req, res) => {
  try {
    const { userId, userEmail } = req.body;

    // 임시 코드 -> 정리 필요 부분 ID email 입력칸
    if (req.body.userEmail === '' || req.body.userId === '') {
      res.send('이메일 또는 아이디를 입력해 주세요.');
    }

    // 인증 번호, 번호 생성 날짜
    const config = texts(1);
    const pwDate = new Date();

    // ID에 매칭해서 값
    const query1 = 'UPDATE usertbl SET pwDate=?, pwAuth =? WHERE userId = ?';
    db.query(query1, [pwDate, config, userId], (err, res) => {
      if (err) {
        console.log(err);
      }
    });

    // Email 확인 및 메일 발송
    const query2 = 'SELECT * FROM usertbl WHERE userEmail = ?;';
    db.query(query2, [userEmail], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        // 이름 값 db에서 확인
        let userName = res[0].userName;

        // 메일 옵션
        const transporter = nodemailer.createTransport({
          service: 'naver',
          host: 'smtp.naver.com',
          port: 465,
          secure: false,
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PW,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // 첨부 메시지
        const message = {
          from: process.env.EMAIL_ID,
          to: userEmail,
          subject:
            userName + '님 안녕하세요! PaP에서 PW 초기화 메일 보내드립니다!',
          html:
            '안녕하세요 ' +
            userName +
            '님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>' +
            '비밀번호 초기화 인증번호를 다음과 같이 보내드립니다.<br> 인증번호 유효 시간은 1시간 입니다.<br>' +
            '인증번호 : <b>' +
            config +
            '</b>',
        };

        // [보내기]
        transporter.sendMail(message, (err, res) => {
          if (err) {
            res.json(err);
            return false;
          } else {
            res.json(sucess);
            transporter.close();
            return true;
          }
        });
      }
    });

    // 라우터 및 기타 ui등 위치
    res.send('전송 완료');
  } catch (error) {
    console.log(error);
  }
};
// 조건 정규해야함.
exports.newPw = (req, res) => {
  try {
    const { userId, userEmail, pwAuth, userPw, PwCheck } = req.body;

    // ID 조회
    const query = 'SELECT * FROM usertbl WHERE userId = ?;';
    db.query(query, [userId], async (err, res) => {
      if (err) {
        console.log(err);
      }
      // email, 인증 번호 비교
      else if (res[0].userEmail == userEmail && res[0].pwAuth == pwAuth) {
        // 비밀번호
        if (userPw === PwCheck) {
          // 암호화 재저장
          const hashedPasword = await bcrypt.hash(userPw, 8);
          // 새 비밀번호, 인증번호 임시 변경 <- 향후에 시간 있으면 인증번호 삭제로 변경
          const query =
            'UPDATE usertbl SET userPw=?, pwAuth=? WHERE userId = ?;';
          db.query(
            query,
            [hashedPasword, hashedPasword, userId],
            (err, res) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    });
    res.send('test');
    // 반환
    // res.json(sucess)
  } catch (err) {
    console.log(err);
  }
};
