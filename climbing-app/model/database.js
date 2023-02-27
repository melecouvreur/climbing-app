require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "users",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =  `DROP TABLE IF EXISTS user_info_test;
              CREATE TABLE user_info (
              uID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
              firstname VARCHAR(40) NOT NULL,
              lastname VARCHAR(40) NOT NULL,
              username VARCHAR(40),
              email VARCHAR(40),
              pronouns VARCHAR(40),
              avatar VARCHAR(5000),
              bio VARCHAR(5000),
              location VARCHAR(500),
              level VARCHAR(200),
              top TINYINT(1),
              gender VARCHAR(50)
              );
              
              DROP TABLE IF EXISTS days_test;
              CREATE TABLE days (
              dID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
              day VARCHAR(20),
              uID INT REFERENCES user_info(uID)
              SET CONNECTION TO user_info TABLE
              );`

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `user_info_test` and 'days_test' was successful!");

    console.log("Closing...");
  });

  con.end();
});

