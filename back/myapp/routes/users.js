var { addFriendsToUser }  = require('../scripts/account/account');
var { finishSend }  = require('../scripts/midllewares/common');
var express = require('express');
var router = express.Router();
var { verifyToken } = require('../scripts/midllewares/token')
var { getUserData, getUserFriendList } = require('../scripts/users')
var { checkDbConnection } = require('../scripts/midllewares/checkDbConnection')
var { API_METHODS_PATHS } = require("../constants/apiUrl");
var { simpleErrorHandler } = require("../scripts/errorHandlers/common")

router.get(API_METHODS_PATHS.GET_USER_DATA, [verifyToken, getUserData, addFriendsToUser, finishSend ])
        .use(simpleErrorHandler);

router.get(API_METHODS_PATHS.GET_USER_FRIEND_LIST, [verifyToken, getUserFriendList])
        .use(simpleErrorHandler);

module.exports = router;