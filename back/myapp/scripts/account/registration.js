var { dispatchError }  = require( "../errorHandlers/common");

var email = require("emailjs");
var emailExistence = require("email-existence")
var mongoose = require("mongoose");
var { User } = require('../../models/User')
var fs = require('fs')
var {generateRandString, deleteFolder, deleteFiles} = require("../utils");
var { validateUser } = require("../validation")
var { USER_ERRORS } = require("../../constants/errors")
var { paths } = require("../../constants/common")

function start(req, res, next) {
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
    if(result.isError == false){
        next();
    } else {
        res.statusCode = 403;
        res.message = JSON.stringify(result,null, "\t");
        next(USER_ERRORS.REGISTRATION_USER_MODEL_INVALIDE)
    }
}

function checkMailForExistence(req, res, next){
    
    if((req.user && req.user.email === req.newUser.email)){
        next();
        return;
    }

    emailExistence.check(req.newUser.email, (error, response) => {
      if(response == true){
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
        next();
      }
      else 
      { 
        dispatchError(res, next, USER_ERRORS.EMAIL_BUSY, 403);
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
              res.message = err;
              next(res.message);
        } else {
            req.user = user;
            next();
        }
    });
}

function clearRegistrationRequest(req){
    deleteFiles(req.files)
    if(req.newUser == undefined)
        return;

    User.findOne({email: req.newUser.email}, (err, result) => {
        if(!err && result !== null) {
            User.deleteOne({email: req.newUser.email});
            deleteFolder(`${paths.PATH_TO_USER_DATA}${result._id.toString(16)}`)
        } 
    });

    
}
  
module.exports.start = start;
module.exports.checkMailForExistence = checkMailForExistence;
module.exports.checkMailInDB = checkMailInDB;
module.exports.createUser = createUser;
module.exports.validate = validate;
module.exports.clearRegistrationRequest = clearRegistrationRequest;