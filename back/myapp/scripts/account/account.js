var { PUBLICATION } = require("../../constants/modelNames");
var { Publication } = require( "../../models/Publication");
var { Promise } = require( "mongoose");
var { getPublicationForSendWithUpdateUserAvatar } = require( "../../models/PublicationUtils");
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
var { changeUserForSearchRes, updateAvatarsForArrayUsers, updateUserArrayForSend } = require("../../models/UserUtils");

function getAuthUserData(req, res, next){
  let { user } = req;
  let querie = [ 
                User.findById(user._id, userQueries.commonUserQuery)
                .populate({
                  path: userQueries.friends,
                  select: userQueries.minUserQuery,
                  options: {
                    limit: 6,
                  }
                })
                .lean(),

                Publication.find({user: user._id})
                .populate(PUBLICATION.USER ,userQueries.titleUserQuery)
                .sort(userQueries.DEC_DATE_PUBLICATE_SORT)
                .lean()
              ];
  Promise.all(querie)
  .then(result => {
    let userData = updateUserAvatarPaths(result[0]);

    userData.publications = result[1].map(value => { 
      return getPublicationForSendWithUpdateUserAvatar(value);
    });
    
    res.data = {
      ...res.data,
      user: {
        ...userData,
        friends: updateUserArrayForSend(userData.friends, userData),
        outgoing: updateUserArrayForSend(userData.outgoing, userData),
        incoming: updateUserArrayForSend(userData.incoming, userData)
        }
      } 
    next();
  })
  .catch(err => {
    console.log(err);
    dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
    return;
  })
}

function addFriendsToUser(req, res, next){
  next();
  return;
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