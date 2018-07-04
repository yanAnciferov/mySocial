var { getPublicationForSend } = require("../models/PublicationUtils");
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
   
    console.log( id );
    let querie = [ 
                    User.findById(id, userQueries.commonUserQuery).lean(),
                    Publication.find({idPublisher: id}).limit(5).lean() 
                ];
    Promise.all(querie)
    .then(result => {
        console.log(result[0]);
      let userData = changeUserForSearchRes(result[0], req.user);
      userData.publications = result[1].map(value => { return getPublicationForSend(value, result[0]); })
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
    User.findById(id, "friends incoming outgoing")
        .lean()
        .then(userFriendsId => {
            Promise.all([
                User.find({'_id': { $in: userFriendsId.friends } }, userQueries.minUserQuery).lean(),
                User.find({'_id': { $in: userFriendsId.incoming } }, userQueries.minUserQuery).lean(),
                User.find({'_id': { $in: userFriendsId.outgoing } }, userQueries.minUserQuery).lean()
            ])
            .then(results => {
                res.send({
                    friends: results[0].map(value => { return changeUserForSearchRes(value, req.user) } ),
                    incoming: results[1].map(value => { return changeUserForSearchRes(value, req.user) } ),
                    outgoing: results[2].map(value => { return changeUserForSearchRes(value, req.user) } )
                });
            })
            .catch(err => consoleLogErrorHandler(err));
        })
        .catch(err => {
            dispatchError(res,next,USER_ERRORS.NOT_FOUND,404);
        })
}

module.exports.getUserData = getUserData;
module.exports.getUserFriendList = getList;