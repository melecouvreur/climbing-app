var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/*GET all users */
router.get("/users", function(req, res, next) {
  db("SELECT * FROM user_info;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

/*GET users by uID*/
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

/*POST new user*/
router.post("/users", async function(req, res, next) {
  const {firstname, lastname, username, email, pronouns, avatar, bio, location, level, top} = req.body
  try {
    await db(
      `INSERT INTO user_info 
      (firstname, lastname, username, email, pronouns, avatar, bio, location, level, top) 
       VALUES ("${firstname}","${lastname}","${username}","${email}","${pronouns}","${avatar}","${bio}","${location}",
       "${level}","${top}");`
    )
    let results = await db(
      `SELECT * FROM user_info ORDER BY uID ASC;`
    );
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

/*GET all days*/
router.get("/days", async function(req, res, next) {
      try {
        let results = await db(`SELECT * FROM days ORDER BY dID ASC;`);
        res.status(200).send(results.data);
      } catch (err) {
        res.status(500).send(err);
      }
    })

/*GET/recommended users based on match criteria ( = testing route. remove later)*/
router.get("/recommend", async function(req, res, next) {
      try {
        let days = ["Tuesday","Monday"]
        let queryList = "('" + days.join("','") + "')"
        let results = await db(`SELECT * FROM user_info LEFT JOIN days ON user_info.uID = days.uID WHERE days.day in ${queryList} AND user_info.location = "London";`)
        res.status(200).send(results.data);
      } catch (err) {
        res.status(500).send(err); 
      } 
    })

/*POSTS/recommends users based on matching days & location*/
router.post("/recommend", async function(req, res, next) {
      const {days, location} = req.body
      let queryList = "('" + days.join("','") + "')"
            try {
              let results = await db(`SELECT * FROM user_info LEFT JOIN days ON user_info.uID = days.uID WHERE days.day in ${queryList} AND user_info.location = "${location}";`)
              res.status(200).send(results.data);
            } catch (err) {
              res.status(500).send(err); 
            } 
          })
      

module.exports = router;

//removed render and index l6
//here you specify apis 