var { USER_ERRORS } = require("../../constants/errors");

var { paths } = require("../../constants/common");

var { loginConfig } = require("../../constants/config");

var { LOGIN } = require("../../constants/errors");
var { updateImagePaths } = require("../utils")
var { User } = require("../../models/User");
var { dispatchError } = require("../errorHandlers/common")
var jwt = require("jsonwebtoken");


function getAuthUserData(req, res, next){
    jwt.verify(req.token, loginConfig.secretKey, (err, authData) => {
      if(err) {
        dispatchError(res,next,LOGIN.UNAUTHORIZED, 403)
      }
      else {
        var { user } = authData;
        User.findById(user._id, "firstname surname email birthdate avatar minAvatar parrentname", (err, result) => {
          if(err){
            dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
          } else res.send(updateImagePaths(result))
        })
      }
    })
  }

module.exports.getAuthUserData = getAuthUserData;
