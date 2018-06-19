var email = require("emailjs");
var emailExistence = require("email-existence")
var mongoose = require("mongoose");
var { User } = require('../models/User')
var fs = require('fs')
var appEmail = require('../constants/email');
var {generateRandString} = require("../scripts/utils");
var { validateUser } = require("./validation")
var { USER_ERRORS } = require("../constants/errors")
var { paths } = require("../constants/common")
var { deleteFolder, deleteFiles } = require("../scripts/utils")

function start(req, res, next) {

    if(mongoose.connection.readyState == 0){
        res.statusCode = 500;
        res.message = USER_ERRORS.DB_NOT_CONNECTED;
        next(res.message)
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
    if(result.isError == false){
        console.log("Valid")
        next();
    } else {
        res.statusCode = 403;
        res.message = JSON.stringify(result,null, "\t");
        next(USER_ERRORS.REGISTRATION_USER_MODEL_INVALIDE)
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
        res.message = USER_ERRORS.INVALID_EMAIL;
        next(res.message)
      }
    });
}
  
function checkMailInDB(req,res,next){

    User.findOne({email: req.newUser.email}, (err, user) => {
      if(user === null){
        console.log("Email not contained in DB")
        next();
      }
      else 
      { 
        res.statusCode = 403;
        console.log(USER_ERRORS.EMAIL_BUSY)
        res.message = USER_ERRORS.EMAIL_BUSY;
        next(res.message);
      }
    })
}
  
  
function createUser(req,res,next){
  
    let { newUser } = req;
    let password = generateRandString();
    newUser.password = password;
  
    User.createUser(newUser, (err, user) => {
        if (err){
              res.statusCode = 403;
              console.log(err)
              res.message = err;
              next(res.message);
        } else {
            console.log("User created")
           next();
        }
    });
}

function clearRegistrationRequest(req){
    deleteFiles(req.files)
    console.log("!!!")
    User.find({email: req.newUser.email}, (err, result) => {
      deleteFolder(`${paths.PATH_TO_USER_DATA}${result.toString(16)}`)
    });
}
  


module.exports.start = start;
module.exports.checkMailForExistence = checkMailForExistence;
module.exports.checkMailInDB = checkMailInDB;
module.exports.createUser = createUser;
module.exports.validate = validate;
module.exports.clearRegistrationRequest = clearRegistrationRequest;