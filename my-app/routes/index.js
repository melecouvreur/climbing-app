var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken")
const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn")
//const ensureUserExists = require("../guards/ensureUserExists")
const bcrypt = require("bcrypt");
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/*GET all users */
router.get("/users", function(req, res, next) {
  db("SELECT * FROM users;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});
 
/*GET user by uID*/
router.get("/profile/:id", async function(req, res, next) {
  try {
    let id = req.params.id
    let results = await db(
      `SELECT * FROM users where uID = ${id} 
       ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
    console.log(results.data)
  } catch (err) {
    res.status(500).send(err);
  } 
});    

/*POST user info*/
router.post("/profile/:id", async function(req, res, next) {
  let id = req.params.id
  const {username, email, pronouns, avatar, bio, location, level, gender} = req.body
  try {
    await db(
     `UPDATE users SET email = ${email}, 
      pronouns = "${pronouns}", username = ${username},
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

/*EDIT user info*/
router.put("/profile/:id", async function(req, res, next) {
  let id = req.params.id
  const {username, email, pronouns, avatar, bio, location, level, gender} = req.body
  try {
    await db(
     `UPDATE users SET username = "${username}",
      email = "${email}", pronouns = "${pronouns}", 
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

/* POST/recommends users based on matching days & location*/
// To do - add cert as filter. Didn't want to overcomplicate and have to add more fake users.
router.post("/recommend", async function(req, res, next) {
      const {dayNames, location, levelNames, genderNames} = req.body
      let dayList = "('" + dayNames.join("','") + "')"
      let levelList = "('" + levelNames.join("','") + "')"
      let genderList = "('" + genderNames.join("','") + "')"
            try {
              let results = await db(`SELECT 
              DISTINCT users.username, users.bio, 
              users.pronouns, users.avatar, users.location, users.level, 
              users.email, users.uID
              FROM users 
              LEFT JOIN days ON users.uID = days.uID 
              WHERE days.day in ${dayList} AND days.selected = 1
              AND users.level in ${levelList} 
              AND users.gender in ${genderList}
              AND users.location = "${location}";`)
              res.status(200).send(results.data);
            } catch (err) {
              res.status(500).send(err); 
            } 
          })

/*GET days by uID*/
router.get("/days/:id", async function(req, res, next) {
  try {
    let id = req.params.id
    let results = await db(
      `SELECT * FROM days where uID = ${id} 
       ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
    console.log(results.data)
  } catch (err) {
    res.status(500).send(err);
  } 
});  
      
/*POST climbing days of user*/
router.post("/days/:id", async function(req, res, next) {
  let id = req.params.id
  const {days} = req.body
  //let queryList = "('" + days.join("','") + "')"
  try {
    for (let d of days) {
    let name = d.name
    let selected = d.selected
    await db(`INSERT INTO days (uID, day, selected) VALUES (${id},"${name}", ${selected});`)
    }
    let results = await db(
      `SELECT * FROM days WHERE uID = ${id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } 
  catch (err) {
    res.status(500).send(err);
  }
})

/*PUT climbing days for user*/
router.put("/days/:id", async function(req, res, next) {
  let id = req.params.id
  const {days} = req.body
  //let queryList = "('" + days.join("','") + "')"
  try {
    for (let d of days) {
    let name = d.day
    let selected = d.selected
    await db(`UPDATE days SET selected = ${selected} 
    WHERE uID = ${id} AND day = "${name}";`)
    }
    let results = await db(
      `SELECT * FROM days WHERE uID = ${id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } 
  catch (err) {
    res.status(500).send(err);
  }
})

//remove later
router.delete("/days/:id", async function(req, res, next) {
  let id = req.params.id
  const {daysToDelete} = req.body
  //let queryList = "('" + days.join("','") + "')"
  try {
    for (let day of daysToDelete) {
    await db(`DELETE from days WHERE uID = ${id} AND day = "${day}";`)
    }
    let results = await db(
      `SELECT * FROM days;`
    );
    res.status(200).send(results.data);
  } 
  catch (err) {
    res.status(500).send(err);
  }
})

/*GET cert by uID*/
router.get("/cert/:id", async function(req, res, next) {
  try {
    let id = req.params.id
    let results = await db(
      `SELECT * FROM certifications where uID = ${id} 
       ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
    console.log(results.data)
  } catch (err) {
    res.status(500).send(err);
  } 
});  
      
/*POST climbing cert of user*/
router.post("/cert/:id", async function(req, res, next) {
  let id = req.params.id
  const {certifications} = req.body
  //let queryList = "('" + days.join("','") + "')"
  try {
    for (let c of certifications) {
    let type = c.name
    let selected = c.selected
    await db(`INSERT INTO certifications (uID, type, selected) VALUES (${id},"${type}", ${selected});`)
    }
    let results = await db(
      `SELECT * FROM certifications WHERE uID = ${id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } 
  catch (err) {
    res.status(500).send(err);
  }
})

/*PUT climbing cert for user*/
router.put("/cert/:id", async function(req, res, next) {
  let id = req.params.id
  const {certifications} = req.body
  //let queryList = "('" + days.join("','") + "')"
  try {
    for (let c of certifications) {
    let type = c.type
    let selected = c.selected
    await db(`UPDATE certifications SET selected = ${selected} 
    WHERE uID = ${id} AND type = "${type}";`)
    }
    let results = await db(
      `SELECT * FROM certifications WHERE uID = ${id} ORDER BY uID ASC;`
    );
    res.status(200).send(results.data);
  } 
  catch (err) {
    res.status(500).send(err);
  }
})

/* POST username, password, email to register new user */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPWD = await bcrypt.hash(password, saltRounds)
  try {
    await db(
    `INSERT into users (username, email, password) 
     VALUES ("${username}", "${email}", "${hashedPWD}")`);
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
    const user_id = user.uID;
    console.log(user_id)
    const correctPassword = await bcrypt.compare(password, user.password); 
      // compare pw req body to db pw. returns boolean. bcrypt method

    if (!correctPassword) throw new Error("Incorrect password");
      //if pw patches create token
    const token = jwt.sign({ user_id: user.uID, user_name: user.username }, supersecret); 
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

//Private route for logged in users only
router.get("/private", ensureUserLoggedIn, (req, res) => {
  let id = req.user_id
  let name = req.user_name
  res.status(200).send({
  message: "here is your protected data", id, name })
})


module.exports = router;