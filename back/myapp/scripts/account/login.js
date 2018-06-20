var { loginConfig }  = require('../../constants/config');

var { SIGSTKFLT } = require('constants');
var { User } = require('../../models/User');
var jwt = require('jsonwebtoken');
var { LOGIN } = require('../../constants/errors');


function login (req,res) {
    var { email, password } = req.body

    if(typeof email == "undefined")
    {
      res.statusCode = 403;
      res.send(LOGIN.INCORECT_DATA_FOR_LOGIN)
      return;
    }

    User.findOne({email}, (err, user) => {
      if(user == null){
        res.statusCode = 403;
        res.send(LOGIN.INCORECT_DATA_FOR_LOGIN)
      } else if(user.checkPassword(password)) {
        jwt.sign({user}, loginConfig.secretKey,{ expiresIn: "30 days" }, (err, token) => {
          res.json({
            token
          })
        })
      } else {
        res.statusCode = 403;
        res.send(LOGIN.INCORECT_DATA_FOR_LOGIN)
        return;
      }
    })
  }


function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
      req.token = bearerHeader.split(' ')[1];
      next();
  } else {
    res.statusCode = 403;
    res.send(LOGIN.UNAUTHORIZED)
  }
}


module.exports.login = login;
module.exports.verifyToken = verifyToken;