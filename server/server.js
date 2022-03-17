const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');

dotenv.config({ path: './.env' });

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
};

// session
var sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: 'asdfasffdas',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection(options);

//router
var matchRouter = require('./routes/Match');
app.use('/match', matchRouter);

var chatRouter = require('./routes/Chat');
app.use('/chat', chatRouter);

var marketRouter = require('./routes/Market');
app.use('/market', marketRouter);

var mypageRouter = require('./routes/Mypage');
app.use('/mypage', mypageRouter);

//postRouter 추가 부분
require('./routes/postRouter')(app);
//commentRouter 추가
require('./routes/comment')(app);

app.use('/auth', require('./routes/auth'));
app.use('/find', require('./routes/find'));
app.use('/user', require('./routes/user'));

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('MYSQL이 연결되었습니다');
  }
});

const port = process.env.PORT || 3001 || 3002;
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});
