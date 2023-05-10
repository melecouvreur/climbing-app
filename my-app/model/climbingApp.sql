DROP TABLE IF EXISTS users;
              CREATE TABLE users (
              uID INTEGER NOT NULL AUTO_INCREMENT,
              firstname VARCHAR(40) NOT NULL,
              lastname VARCHAR(40) NOT NULL,
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
              FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE);

         
         INSERT INTO users 
      (firstname, lastname, username, email, pronouns, avatar, bio, location, level, cert, gender) 
       VALUES ("Mele","","melecouvreur","${email}","${pronouns}","${avatar}","${bio}","${location}",
       "${level}","${cert}", "${gender}") WHERE uID = ${id};`
    )