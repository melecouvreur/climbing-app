var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken")
//const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn")
//const ensureUserExists = require("../guards/ensureUserExists")
const bcrypt = require("bcrypt");
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/*Route 1 - GET all users */
router.get("/users", function(req, res, next) {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
 
/*Route 2 - GET users by uID*/
router.get("/profile", async function(req, res, next) {
  try {
    let id = 1
    let results = await db(
      `SELECT * FROM users where uID = ${id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
    console.log(results.data)
  } catch (err) {
    res.status(500).send(err);
  } 
});    

/*Route 3 - POST new user info*/
//
router.post("/profile/:id", async function(req, res, next) {
  let id = 2
  const {firstname, lastname, username, email, pronouns, avatar, bio, location, level, cert, gender} = req.body
  try {
    await db(
     `UPDATE users SET pronouns = "${pronouns}", 
      avatar = "${avatar}", bio = "${bio}",
      location = "${location}", level = "${level}", 
      gender = "${gender}" WHERE uID = ${id};`
    )
    let results = await db(
      `SELECT * FROM users ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
})

/*Route 4 - EDIT user info*/
router.put("/profile/:id", async function(req, res, next) {
  let id = 1
  const {username, firstname, lastname, email, pronouns, avatar, bio, location, level, top, gender} = req.body
  try {
    await db(
     `UPDATE users SET username = "${username}", firstname = "${firstname}",
      lastname = "${lastname}", email = "${email}", 
      pronouns = "${pronouns}", avatar = "${avatar}", bio = "${bio}",
      location = "${location}", level = "${level}",
      gender = "${gender}" 
      WHERE uID = ${id};`
    )
    let results = await db(
      `SELECT * FROM users ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
})

/* Route 5 - POST/recommends users based on matching days & location*/
// To do - to add lead as filter. Didn't want to overcomplicate and have to add more fake users.
router.post("/recommend", async function(req, res, next) {
      const {days, location, level, gender, top} = req.body
      let queryList = "('" + days.join("','") + "')"
            try {
              let results = await db(`SELECT 
              DISTINCT user_info.firstname, user_info.lastname, user_info.username, user_info.bio,
              user_info.pronouns, user_info.avatar, user_info.location, user_info.level, user_info.top, user_info.email, user_info.uID
              FROM user_info 
              LEFT JOIN days ON user_info.uID = days.uID WHERE days.day in ${queryList} 
              AND user_info.location = "${location}" 
              AND user_info.level = "${level}" AND user_info.gender = "${gender}" AND user_info.top = ${top};`)
              res.status(200).send(results.data);
            } catch (err) {
              res.status(500).send(err); 
            } 
          })

/*GET/recommended users based on match criteria ( = testing route. remove later)*/
router.get("/recommend", async function(req, res, next) {
  try {
    let days = ["Tuesday", "Monday", "Saturday"]
    let queryList = "('" + days.join("','") + "')"
    let results = await db(`SELECT 
    DISTINCT user_info.firstname, user_info.lastname, user_info.username, user_info.bio,
    user_info.pronouns, user_info.avatar, user_info.location, user_info.level, user_info.top, user_info.email, user_info.uID
    FROM user_info 
    LEFT JOIN days ON user_info.uID = days.uID 
    WHERE days.day in ${queryList} AND user_info.location = "London";`)
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err); 
  } 
})
      
/*POST climbing days for user*/
router.post("/days", async function(req, res, next) {
  const {uID, day} = req.body
  try {
    await db(`INSERT INTO days (uID, day) VALUES (${uID}, "${day}");`)
    let results = await db(
      `SELECT * FROM days ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
})

/*GET all days (for testing)*/
router.get("/days", async function(req, res, next) {
    try {
      let results = await db(`SELECT * FROM days ORDER BY dID ASC;`);
      res.status(200).send(results.data);
    } catch (err) {
      res.status(500).send(err);
    }
  })

/* POST username, password, email to register new user */
router.post("/register", async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  const hashedPWD = await bcrypt.hash(password, saltRounds)
  try {
    await db(
    `INSERT into users (username, firstname, lastname, email, password) VALUES ("${username}","${firstname}","${lastname}", "${email}", "${hashedPWD}")`);
    res.status(200).send({message: "Registration successful"})
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}); 

/* POST username and password to login user */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const results = await db(
    `SELECT * FROM users WHERE username = "${username}";`
    );
    const user = results.data[0];
    //if user found, compare pw
    if (user) {
    const user_id = user.id;
    const correctPassword = await bcrypt.compare(password, user.password); 
      // compare pw req body to db pw. returns boolean. bcrypt method

    if (!correctPassword) throw new Error("Incorrect password");
      //if pw patches create token
    const token = jwt.sign({ user_id: user.id }, supersecret); 
      //jwt method, takes param user_id as payload and supersecret key .env
      //send token and user id to user
    console.log(token)

    res.send({ message: "Login successful, here is your token and id", token, user_id });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


module.exports = router;