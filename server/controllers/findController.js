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
    // data 넘어온것 확인 완료
    console.log(req.body);

    const { userId, userEmail, userName}= req.body;

    // 조회 Email와 ID가 맞춰지지 않는 경우의 확인
    // const query1 = 'SELECT userEmail FROM usertbl WHERE userEmail = userId ;';
    // console.log(query1)
    // db.query(query1, (err, res) => {
    //   if(err){
    //     console.log(err)
    //   }
    //   else{
    //     'SELECT userId SET userEmail = userId;';
    //   }
    // });

    // console.log("에러입니다.")
    // res.redirect('/findId', {
    //   message: '이름 또는 이메일이 잘못됐습니다',
    // });

    // ID값 연동
    // const query2 = 'SELECT * FROM usertbl WHERE userEmail = userId, userNick;';
    // db.query(query2, (err, res) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //   }
    // });


    const transporter = nodemailer.createTransport({
      service: 'naver',
      host: 'smtp.naver.com',
      // true for 465, false for other ports
      // 네이버 기준으로 계정의 POP와 SMTP이 열려있으면 465 포트 번호를 사용하여 연결한다.
      port: 465,
      // 이메일을 보낼 계정 데이터 입력 ->
      // 인증 객체가 존재해야 한다. true 에서 false로 변경했습니다.
      secure: false,
      auth: { 
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
      },
      tls:{
      //   // 인증되지 않은 경우
        rejectUnauthorized : false,
      }
    });

    const message ={
      from: process.env.EMAIL_ID,
      to: userEmail, // 
      subject:  userName +"님 안녕하세요! PaP에서 ID 확인 메일 보내드립니다!",
      html: "안녕하세요 " + userName + "님 항상 저희 PaP 서비스를 이용해주셔서 감사드립니다.<br>"
      + userName + "님의 아이디는 " + userId + "입니다.<br>"
      + "더욱 노력하는 PaP일동이 되겠습니다." 
    };

  transporter.sendMail(message, (err, res) =>{
    if(err){
      // 실패시 에러처리
        res.json(err);
    }else{
      // 성공
        // res.json(sucess);
        res.status(200).redirect('/');
    }
    transporter.close();
  });
  }

  // 예외 처리 리팩터링 단계에서 사용
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