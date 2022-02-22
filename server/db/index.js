const mysql = require('mysql');

var con = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"1234",
  database:"papdb",
  port:3306,
  debug:false
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected");
})