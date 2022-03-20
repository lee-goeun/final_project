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

    // Email 기준 조회
    const query =
      'SELECT userId FROM usertbl WHERE userEmail = ? AND userName=?;';
    db.query(query, [userEmail, userName], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const Id = res[0].userId;

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
        console.log(message);
        // 보내기
        transporter.sendMail(message, (err, res) => {
          console.log('test', res);
          if (err) {
            res.json(err);
            return false;
          } else {
            res.json('sucess');
            transporter.close();
            return true;
          }
        });
      }
    });
    return res.json('test');
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

    // 정리 필요 부분 ID email 입력칸
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
    const query2 = 'SELECT * FROM usertbl WHERE userEmail = ? AND userId=?;';
    db.query(query2, [userEmail, userId], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const userNameSend = res[0].userName;

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
            userNameSend +
            '님 안녕하세요! PaP에서 PW 초기화 메일 보내드립니다!',
          html:
            '안녕하세요 ' +
            userNameSend +
            '님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>' +
            '비밀번호 초기화 인증번호를 다음과 같이 보내드립니다.<br> 인증번호를 절대 공유하지 말아주세요.<br>' +
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
            res.json('sucess');
            transporter.close();
            return true;
          }
        });
      }
    });
    return res.json('test');
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
    return res.json('okey');
    // 반환
    // res.json(sucess)
  } catch (err) {
    console.log(err);
  }
};
