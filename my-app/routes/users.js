
var express = require('express');
var router = express.Router();
const db = require("../model/helper");
require("dotenv").config();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.send('respond with a resource');
});



module.exports = router; 

   