var { loginConfig }  = require('../../constants/config');

var { SIGSTKFLT } = require('constants');
var { User } = require('../../models/User');
var jwt = require('jsonwebtoken');
var { LOGIN } = require('../../constants/errors');
var { dispatchError } = require("../errorHandlers/common")

function login (req,res,next) {
    var { email, password } = req.body

    if(typeof email == "undefined")
    {
      dispatchError(res,next,LOGIN.INCORECT_DATA_FOR_LOGIN,403);
    }

    User.findOne({email}, (err, user) => {
      if(user == null){
        dispatchError(res,next,LOGIN.INCORECT_EMAIL_FOR_LOGIN,403);
      } else if(user.checkPassword(password)) {
        jwt.sign({user}, loginConfig.secretKey,{ expiresIn: "30 days" }, (err, token) => {
          res.json({
            token
          })
        })
      } else {
        dispatchError(res,next,LOGIN.INCORECT_PASSWORD_FOR_LOGIN,403);
      }
    })
  }


module.exports.login = login;