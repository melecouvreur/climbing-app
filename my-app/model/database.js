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
  database: DB_NAME || "database",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =  `DROP TABLE IF EXISTS users;
  CREATE TABLE users (
  uID INTEGER NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(2000) NOT NULL,
  username VARCHAR(40),
  pronouns VARCHAR(40),
  avatar VARCHAR(5000),
  bio VARCHAR(5000),
  location VARCHAR(500),
  level VARCHAR(200),
  gender VARCHAR(50),
  PRIMARY KEY (uID),
  UNIQUE KEY unique_username (username));

  DROP TABLE IF EXISTS days;
              CREATE TABLE days(
              dID INTEGER NOT NULL AUTO_INCREMENT,
              uID INTEGER NOT NULL,
              day VARCHAR(20) NOT NULL,
              selected BOOLEAN NOT NULL,
              PRIMARY KEY (dID),
              FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE);

              DROP TABLE IF EXISTS certifications;
              CREATE TABLE certifications(
              cID INTEGER NOT NULL AUTO_INCREMENT,
              uID INTEGER NOT NULL,
              type VARCHAR(20) NOT NULL,
              selected BOOLEAN NOT NULL,
              PRIMARY KEY (cID),
              FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE);`
              
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `user_info` and 'days' was successful!");

    console.log("Closing...");
  });

  con.end();
});

