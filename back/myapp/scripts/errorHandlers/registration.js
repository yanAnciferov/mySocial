var { clearRegistrationRequest } = require("../account/registration");



function registrationError(err,req,res,next){
    clearRegistrationRequest(req);
    res.send(res.message);
  }

module.exports.registrationError = registrationError