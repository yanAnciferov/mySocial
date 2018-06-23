var { USER_ERRORS } = require("../constants/errors");
var { loginConfig } = require("../constants/config");
var { LOGIN } = require("../constants/errors");
var { User } = require("../models/User");
var { getPathToImages, updateUserAvatarPaths } = require("./utils")
var jwt = require("jsonwebtoken");
var { dispatchError } = require("./errorHandlers/common")


function getUserData(req, res, next){
    var { id } = req.query;
    User.findById(id, "firstname surname email avatar minAvatar birthdate parrentname", (err, result) => {
        if(err) {
            dispatchError(res,next,USER_ERRORS.NOT_FOUND,404);
            return;
        } else {
            res.send(updateUserAvatarPaths(result));
        }
    })
  }

module.exports.getUserData = getUserData;
