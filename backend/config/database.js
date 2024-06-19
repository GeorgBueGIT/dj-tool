import mysql from "mysql2";
import config from './config.js';

var con = mysql.createConnection({
  host: process.env.DB_HOST || config.DB_HOST,
  user: process.env.DB_USER || config.DB_USER,
  password: process.env.DB_PASSWORD || config.DB_PASSWORD,
  database: process.env.DB_NAME || config.DB_NAME,
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
