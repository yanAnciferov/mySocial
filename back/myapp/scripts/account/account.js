var { USER_ERRORS } = require("../../constants/errors");

var { paths } = require("../../constants/common");

var { loginConfig } = require("../../constants/config");

var { LOGIN } = require("../../constants/errors");
var { updateUserAvatarPaths } = require("../utils")
var { User } = require("../../models/User");
var { dispatchError } = require("../errorHandlers/common")
var jwt = require("jsonwebtoken");


function getAuthUserData(req, res, next){
    let { user } = req;
    User.findById(user._id, "firstname surname email birthdate avatar sex minAvatar parrentname", (err, result) => {
      if(err || !result){
        dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
        return;
      } else { 
          res.data = { 
            ...res.data,
            user: (updateUserAvatarPaths(result)) 
        }
        next();
      }
    })
  }

module.exports.getAuthUserData = getAuthUserData;
