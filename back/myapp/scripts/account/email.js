var { emailConfig } = require('../../constants/config');
var email = require("emailjs");
var { USER_ERRORS } = require("../../constants/errors")
var { User } = require("../../models/User")

function sendPasswordToEmail(req,res,next){
  
    let { newUser } = req;
    var server 	= email.server.connect({
      user:     emailConfig.email,
      password: emailConfig.password,
      host:     emailConfig.protocol,
      ssl:      true
   });
  
   server.send({
    from:       emailConfig.from,
    to:         newUser.email,
    subject:	  emailConfig.subject,
    attachment:
     [
        {data: emailConfig.getHTMLMessage(newUser), alternative:true}
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