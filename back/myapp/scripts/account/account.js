var { userQueries }  = require("../../constants/common");

var { USER_ERRORS } = require("../../constants/errors");

var { paths } = require("../../constants/common");

var { loginConfig } = require("../../constants/config");
var { changeUserForClient } = require("../../models/UserUtils");
var { LOGIN } = require("../../constants/errors");
var { updateUserAvatarPaths } = require("../utils")
var { User } = require("../../models/User");
var { dispatchError } = require("../errorHandlers/common")
var jwt = require("jsonwebtoken");
var { changeUserForSearchRes } = require("../../models/UserUtils");


function getAuthUserData(req, res, next){
  let { user } = req;
  User.findById(user._id, userQueries.commonUserQuery)
  .lean()
  .then(result => {
    res.data = {
      ...res.data,
      user: updateUserAvatarPaths(result)
    }
    next();
  })
  .catch(err => {
    dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
    return;
  })
}

function addFriendsToUser(req, res, next){
  console.log(res.data.user.friends)
  User.find({'_id': { $in: res.data.user.friends } }, userQueries.minUserQuery)
  .limit(10)
  .lean()
  .then(result => {
    res.data.user.friends = result.map(value => {
      return changeUserForSearchRes(value, req.user)
    })
    next();
  })
  .catch(err => {
    console.log(err);
    dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
    return;
  })
}


module.exports.getAuthUserData = getAuthUserData;
module.exports.addFriendsToUser = addFriendsToUser;