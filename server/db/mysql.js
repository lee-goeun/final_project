'use stirct';
// db 설정 <- 서성조 임시 db
// @ts-check
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: 'papdb',
});

db.connect();

module.exports = db;
