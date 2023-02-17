var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get("/users", function(req, res, next) {
  db("SELECT * FROM user_info;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

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
  
router.post("/users", async function(req, res, next) {
  const { firstname, lastname, username, email, pronouns, avatar, bio, location, level, top} = request.body
  try {
    await db(
      `INSERT INTO user_info 
      (firstname, lastname, username, email, 
       pronouns, avatar, bio, location, level, top) 
       VALUES ("${firstname}", "${lastname}","${username}",
       "${email}", "${pronouns}", "${avatar}", "${bio}", "${location}"
       "${level}", "${top}");`
    )
    let results = await db(
      `SELECT * FROM user_info ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = router;

//removed render and index l6
//here you specify apis 