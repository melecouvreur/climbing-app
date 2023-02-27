var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/*Route 1 - GET all users */
router.get("/users", function(req, res, next) {
  db("SELECT * FROM user_info;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
 
/*Route 2 - GET users by uID*/
router.get("/users/:id", async function(req, res, next) {
  try {
    let results = await db(
      `SELECT * FROM user_info where uID = ${req.params.id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  } 
});     

/*Route 3 - POST new user*/
router.post("/users", async function(req, res, next) {
  const {firstname, lastname, username, email, pronouns, avatar, bio, location, level, top, gender} = req.body
  try {
    await db(
      `INSERT INTO user_info 
      (firstname, lastname, username, email, pronouns, avatar, bio, location, level, top, gender) 
       VALUES ("${firstname}","${lastname}","${username}","${email}","${pronouns}","${avatar}","${bio}","${location}",
       "${level}","${top}", "${gender}");`
    )
    let results = await db(
      `SELECT * FROM user_info ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
})

/*Route 4 - EDIT user info*/
router.put("/users/:id", async function(req, res, next) {
  const {username, email, pronouns, avatar, bio, location, level, top, gender} = req.body
  try {
    await db(
     `UPDATE user_info SET username = "${username}", email = "${email}", pronouns = "${pronouns}", avatar = "${avatar}", bio = "${bio}",
      location = "${location}", level = "${level}",
      top = ${top}, gender = "${gender}" WHERE uID = ${req.params.id};`
    )
    let results = await db(
      `SELECT * FROM user_info ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
})


/* Route 5 - POSTS/recommends users based on matching days & location*/
//change to GET
router.post("/recommend", async function(req, res, next) {
      const {days, location, level, gender} = req.body
      let queryList = "('" + days.join("','") + "')"
            try {
              let results = await db(`SELECT 
              DISTINCT user_info.firstname, user_info.lastname, user_info.username, user_info.bio,
              user_info.pronouns, user_info.avatar, user_info.location, user_info.level, user_info.top, user_info.email, user_info.uID
              FROM user_info 
              LEFT JOIN days ON user_info.uID = days.uID WHERE days.day in ${queryList} AND user_info.location = "${location}" AND user_info.level = "${level}" AND user_info.gender = "${gender}";`)
              res.status(200).send(results.data);
            } catch (err) {
              res.status(500).send(err); 
            } 
          })

/*GET/recommended users based on match criteria ( = testing route. remove later)*/
router.get("/recommend", async function(req, res, next) {
  try {
    let days = ["Tuesday","Monday", "Saturday"]
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
      
/*POST climbing days for user (for testing)*/
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


module.exports = router;

//removed render and index l6
//here you specify apis 