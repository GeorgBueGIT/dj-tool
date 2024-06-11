import mysql from "mysql2";
import config from './config.js';

var con = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

export default con;
