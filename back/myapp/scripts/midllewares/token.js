var { User }  = require( "../../models/User");

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
            let { data: {  _id }} = authData;
            User.findById(_id, (err, res) =>  {
              req.user = res;
              next();
            })
           
          }
        })
    } else {
      res.statusCode = 403;
      res.send(LOGIN.UNAUTHORIZED)
    }
  }


  function createAndSendToken(req,res,next){
    jwt.sign({ data: req.user }, loginConfig.secretKey,{ expiresIn: "30 days" }, (err, token) => {
      res.json({
        token
      })
    })
  }

  function createToken(req,res,next){
    jwt.sign({ data: req.user }, loginConfig.secretKey,{ expiresIn: "30 days" }, (err, token) => {
      
      res.data = {
        ...res.data,
        token
      }
      next();
    })
  }


module.exports.verifyToken = verifyToken;
module.exports.createAndSendToken = createAndSendToken;
module.exports.createToken = createToken;