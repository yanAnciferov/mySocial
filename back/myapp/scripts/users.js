var { PUBLICATION }  = require("../constants/modelNames");
var { getPublicationForSendWithUpdateUserAvatar } = require("../models/PublicationUtils");
var { Publication } = require("../models/Publication");
var { Promise } = require("mongoose");
var { USER_ERRORS } = require("../constants/errors");
var { loginConfig } = require("../constants/config");
var { LOGIN } = require("../constants/errors");
var { User } = require("../models/User");
var { getPathToImages, updateUserAvatarPaths } = require("./utils")
var jwt = require("jsonwebtoken");
var { dispatchError, consoleLogErrorHandler } = require("./errorHandlers/common")
var { changeUserForSearchRes } = require("../models/UserUtils")
var { userQueries } = require("../constants/common")

function getUserData(req, res, next){
    let { id } = req.query;
    let querie = [ 
                    User.findById(id, userQueries.commonUserQuery).lean(),
                    Publication.find({user: id})
                    .populate(PUBLICATION.USER, userQueries.titleUserQuery)
                    .sort(userQueries.DEC_DATE_PUBLICATE_SORT)
                    .limit(userQueries.LIMIT_ON_COUNT_PUBLICATION)
                    .lean() 
                ];
    Promise.all(querie)
    .then(result => {
      let userData = changeUserForSearchRes(result[0], req.user);
      userData.publications = result[1].map(value => { return getPublicationForSendWithUpdateUserAvatar(value); })
      res.data = {
        user: userData
      }
      next();
    })
    .catch(err => {
        console.log(err);
      dispatchError(res,next,USER_ERRORS.NOT_FOUND, 404);
      return;
    })
  
  
  }

function getList(req, res, next){

    var { id } = req.query;
    User.findById(id, userQueries.friends)
    .populate(userQueries.friends, userQueries.minUserQuery)
        .lean()
        .then(results => {

            let { friends, incoming, outgoing} = results;
            let delegate = value => { return changeUserForSearchRes(value, req.user) };

            res.send({
                friends: friends.map(delegate),
                incoming: incoming.map(delegate),
                outgoing: outgoing.map(delegate)
            });
        })
        .catch(err => {
            console.log(err);
            dispatchError(res,next,USER_ERRORS.NOT_FOUND,404);
        })
}

module.exports.getUserData = getUserData;
module.exports.getUserFriendList = getList;