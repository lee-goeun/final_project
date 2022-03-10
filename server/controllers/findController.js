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
// tjtjdwh456@naver.com 보내기 메일

exports.findId = async (req, res) => {
  try{
    // data 확인용
    console.log(req.body);

    const { userEmail, userName}= req.body;

    // 조회 Email 기준 조회
    const query = 'SELECT * FROM usertbl WHERE userEmail = ?;';
    db.query(query, [userEmail], (err, res) => {
      if(err){
        console.log(err)
      }

      else{
        let userId = res[0].userId;
        console.log(userId)
        
        // 메일 등록
        const transporter = nodemailer.createTransport({
          service: 'naver',
          host: 'smtp.naver.com',
          // 네이버 기준으로 계정의 POP와 SMTP이 열려있으면 465 포트 번호를 사용하여 연결한다.
          port: 465,
          secure: false,
          auth: { 
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PW,
          },
          tls:{
            rejectUnauthorized : false,
          }
        });

        // 메시지 문구
        const message ={
          from: process.env.EMAIL_ID,
          to: userEmail, // 
          subject:  userName +"님 안녕하세요! PaP에서 ID 확인 메일 보내드립니다!",
          html: "안녕하세요 " + userName + "님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>"
          + userName + "님의 아이디는 " + userId + "입니다.<br>"
          + "더욱 노력하는 PaP일동이 되겠습니다." 
        };

      // 메시지 보내는 파트
      transporter.sendMail(message, (err, res) =>{
        if(err){
            res.json(err);
        }else{
            res.json(sucess);
        }
      });
      }
      
    });
  }
  catch (error) {
    console.log(error);
  }
}

// 비밀번호 찾기
exports.findPw = async (req, res) => {
  // 연결 테스트용 code
  try{
    console.log(req.body);
    // id, email, name으로 pw찾기 및 초기화
    const { userId, userEmail, userName}= req.body;

    const transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com',
      port: 465,
      secure: false,
      auth: { 
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
      },
      tls:{
      // 인증되지 않은 경우
        rejectUnauthorized : false,
      }
    });

    const message ={
      from: process.env.EMAIL_ID,
      to: userEmail, // 
      subject:  userName +"님 안녕하세요! PaP에서 PW 확인 메일 보내드립니다!",
      html: "안녕하세요 " + userName + "님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>"
      + "비밀번호 초기화 링크를 보내드립니다."
    };

  transporter.sendMail(message, (err, res) =>{
    if(err){
      // 실패시 에러처리
        res.json(err);
    }else{
      // 성공
        res.json(sucess);
        // res.status(200).redirect('/');
    }
    // transporter.close();
  });
  }catch(error){
    console.log(error)
  }
  
}