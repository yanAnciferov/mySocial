var { loginConfig } = require("../../constants/config");

var { LOGIN } = require("../../constants/errors");

var { User } = require("../../models/User");
var jwt = require("jsonwebtoken");


function getUserData(req, res){
    jwt.verify(req.token, loginConfig.secretKey, (err, authData) => {
      if(err) {
        res.statusCode = 403;
        res.send(LOGIN.UNAUTHORIZED)
      }
      else {
        var { user } = authData;
        User.findById(user._id, "firstname surname email", (err, result) => {
            res.send(result);
        })
      }
    })
  }

module.exports.getUserData = getUserData;
