const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');

dotenv.config({ path: './.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//router
var matchRouter = require('./routes/Match');
app.use('/match', matchRouter);

var chatRouter = require('./routes/Chat');
app.use('/chat', chatRouter);

var mypageRouter = require('./routes/Mypage');
app.use('/mypage', mypageRouter);

//postRouter 추가 부분
require('./routes/postRouter')(app);
//commentRouter 추가
require('./routes/comment')(app);

app.use('/auth', require('./routes/auth'));

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('MYSQL이 연결되었습니다');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
