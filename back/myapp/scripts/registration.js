var email = require("emailjs");
var emailExistence = require("email-existence")
var mongoose = require("mongoose");
var { User } = require('../models/User')
var fs = require('fs')
var appEmail = require('../constants/email');
var {generateRandString} = require("../scripts/utils");

var { validateUser } = require("./validation")

function start(req, res, next) {

    if(mongoose.connection.readyState == 0){
        res.statusCode = 500;
        console.log("db not connected")
        res.send("db not connected");
    }
    console.log(req.body)

    let newUser = {
      ...req.body,
      imageRect: JSON.parse(req.body.imageRect)
    }
  
    req.newUser = newUser;
    next();
}

function validate(req, res, next) {

    var {newUser} = req;
    newUser.imageFile = req.files[0];

    var result = validateUser(newUser);
    console.log(result)
    if(result.isError == false)
        next();
    else {
        res.statusCode = 403;
        console.log(`${result.field}: ${result.message}`)
        res.send(`${result.field}: ${result.message}`);
    }
}

function checkMailForExistence(req, res, next){
    console.log(req.newUser.email);
    emailExistence.check(req.newUser.email, (error, response) => {
      if(response == true){
          console.log("Existence")
        next();
      } else {
        res.statusCode = 403;
        console.log("Invalid email")
        res.send("Invalid email");
      }
    });
}
  
function checkMailInDB(req,res,next){

    User.findOne({email: req.newUser.email}, (err, user) => {
      if(user !== null){
        res.statusCode = 403;
        res.send("email busy");
        console.log("email busy")
      }else next();
    })
}
  
  
function createUser(req,res,next){
  
    let { newUser } = req;
    let password = generateRandString();
    newUser.password = password;
  
    User.createUser(newUser, (err, user) => {
        if (err){
              res.statusCode = 403;
              console.log(err);
              res.send(err);
        } else {
           next();
        }
    });
}
  


module.exports.start = start;
module.exports.checkMailForExistence = checkMailForExistence;
module.exports.checkMailInDB = checkMailInDB;
module.exports.createUser = createUser;
module.exports.validate = validate;