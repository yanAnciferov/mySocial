var { USER_ERRORS } = require("../constants/errors");
var { loginConfig } = require("../constants/config");
var { LOGIN } = require("../constants/errors");
var { User } = require("../models/User");
var { getPathToImages, updateImagePaths } = require("./utils")
var jwt = require("jsonwebtoken");
var { dispatchError } = require("./errorHandlers/common")


function getUserData(req, res, next){
    jwt.verify(req.token, loginConfig.secretKey, (err, authData) => {
      if(err) {
          dispatchError(res,next,LOGIN.UNAUTHORIZED,403);
      }
      else {
        var { id } = req.body;
        User.findById(id, "firstname surname email avatar minAvatar birthdate parrentname", (err, result) => {
            if(err) {
                dispatchError(res,next,USER_ERRORS.NOT_FOUND,404);
            } else {
                res.send(updateImagePaths(result));
            }
        })
      }
    })
  }

module.exports.getUserData = getUserData;
