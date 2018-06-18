var appEmail = require('../constants/email');
var email = require("emailjs");
var { USER_ERRORS } = require("../constants/errors")
var { User } = require("../models/User")

function sendPasswordToEmail(req,res,next){
  
    let { newUser } = req;
    var server 	= email.server.connect({
      user:     appEmail.email,
      password: appEmail.password,
      host:     appEmail.protocol,
      ssl:      true
   });
  
   server.send({
    from:       appEmail.from,
    to:         newUser.email,
    subject:	  appEmail.subject,
    attachment:
     [
        {data: appEmail.getHTMLMessage(newUser), alternative:true}
     ]
  
  }, (err, message) => {
    if(err){
        res.statusCode = 403;
        console.log(err);
        User.deleteOne({email: newUser.email});
        res.message = USER_ERRORS.FAILED_SEND_MESSAGE_TO_EMAIL;
        next(USER_ERRORS.FAILED_SEND_MESSAGE_TO_EMAIL)
    } else {
      next();
    }
  });
  
}

function sendPassword(req,res,next){
    sendPasswordToEmail(req,res,next);
}

module.exports.sendPassword = sendPassword;