var { LOGIN } = require("../../constants/errors");

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

module.exports.verifyToken = verifyToken;