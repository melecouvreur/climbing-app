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

  let sql =  `DROP TABLE IF EXISTS user_info;
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

              INSERT INTO user_info
              (firstname, lastname, username, pronouns, avatar,
              bio, location, level, top, gender)
              VALUES 
              ("Neen", "Sever", "NeenS", "They/Him", "https://www.pdx.edu/recreation/sites/g/files/znldhr2076/files/styles/event_detail_455x325_/public/2022-09/Queer%20Climb%20%281%29.jpg?h=0089d55f&itok=RYe4cuKZ",
              "No to v5 sharks","London", "Intermediate", 1, "Trans"), 

              ("Beau","Harrison", "Crimpboy", "He/His", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYAOMF4SagiWjJH4so6P-7RrqRaVQnza0uJg&usqp=CAU",
              "Huzzaaah", "London","Advanced", 1, "Male"),

              ("Simon","Bond","RockHopper","He/His","https://climbinghouse.com/wp-content/uploads/2022/09/how_do_climbers_make_money-1024x692.jpg",
              "Professional intructor for +5 years. Looking for outdoor partner", "Sheffield", "Advanced", 1,"Male"),

              ("Tom","Walker","Tommy","He/His", "https://ichef.bbci.co.uk/news/976/cpsprodpb/12E12/production/_124403377_climb1.jpg.webp", 
              "Dad of three and fond climber","London","Beginner", 1, "Male"),

              ("Jon","Falkner","JFalkner", "He/His", "http://media.wbur.org/wp/2017/02/unnamed-1000x667.jpg",
              "Looking to get back into climbing after a 5 year break", "London", "Beginner", 1,"Male"),

              ("Simona","Hill","Simmi","She/Her","https://media.istockphoto.com/id/480310380/photo/climber-woman-standing-in-front-of-a-stone-rock-outdoor.jpg?s=612x612&w=is&k=20&c=Hg3qLlohSh1QBzx8VktLc7jzSGXzPIk00i2eXpjQ4hQ=", 
              "Mainly indoors, but looking to climb outside now summer approaches","London","Advanced", 1, "Female"),

              ("Sarah", "Evans","Rockmom","She/Her","https://www.climbing.com/wp-content/uploads/2009/02/gracie_susan1_14148.jpg?width=375",
              "Mother of 3 children and fond climber", "London", "Advanced", 1, "Female"),

              ("Lizzy","Tylecote","Lizzy", "She/Her","https://www.climbing.com/wp-content/uploads/2009/02/lynn-atd2-squamish_14196.jpg?width=730",
              "Looking to get into Trad", "London", "Advanced", 0, "Female"),

              ("Suzie","Evrard", "SuzieE","She/Her","https://www.climbing.com/wp-content/uploads/2009/02/lynn-atd2-squamish_14196.jpg?width=730",
              "Just started climbing","London","Beginner", 1, "Female");

              
              DROP TABLE IF EXISTS days;
              CREATE TABLE days(
              dID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
              uID INTEGER REFERENCES user_info(uID),
              day VARCHAR(20));
              
              INSERT INTO days (uID, day) 
              VALUES 
              (1, "Saturday"),(1, "Sunday"), (1, "Monday"), (1, "Tuesday"),
              (2, "Saturday"),(2, "Sunday"), (2, "Monday"), (2, "Tuesday"),
              (3, "Saturday"),(3, "Sunday"), (3, "Monday"), (3, "Tuesday"), 
              (4, "Saturday"),(4, "Sunday"), (4, "Monday"), (4, "Tuesday"),
              (5, "Saturday"),(5, "Sunday"), (5, "Monday"), (5, "Tuesday"), (5,"Friday"),
              (6, "Saturday"),(6, "Sunday"), (6, "Monday"), (6, "Tuesday"), (6,"Friday"),
              (7, "Saturday"),(7, "Sunday"), (7, "Wednesday"), (7, "Thursday"), (7,"Friday"),
              (8, "Saturday"),(8, "Sunday"), (8, "Wednesday"), (8, "Thursday"),
              (9, "Saturday"),(9, "Sunday"), (9, "Wednesay"), (9, "Thursday");`

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `user_info` and 'days' was successful!");

    console.log("Closing...");
  });

  con.end();
});

