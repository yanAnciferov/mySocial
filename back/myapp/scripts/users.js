var { Promise }  = require("mongoose");
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
    var { id } = req.query;
    User.findById(id, userQueries.commonUserQuery)
    .lean()
    .then(result => {
        res.data = { 
            user: changeUserForSearchRes(result, req.user)
        }
        console.log(res.data)
        next();
    })
    .catch(err => {
        dispatchError(res,next,USER_ERRORS.NOT_FOUND,404);
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
