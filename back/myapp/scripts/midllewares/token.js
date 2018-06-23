var { loginConfig } = require("../../constants/config");

var { LOGIN } = require("../../constants/errors");
var jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, loginConfig.secretKey, (err, authData) => {
          if(err) {
            dispatchError(res,next,LOGIN.UNAUTHORIZED, 403)
          } else {
            req.user = authData.user;
            next();
          }
        })
    } else {
      res.statusCode = 403;
      res.send(LOGIN.UNAUTHORIZED)
    }
  }

module.exports.verifyToken = verifyToken;