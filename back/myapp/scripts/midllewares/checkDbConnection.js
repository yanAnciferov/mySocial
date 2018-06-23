var { dispatchError } = require("../errorHandlers/common");

var { USER_ERRORS } = require("../../constants/errors");
var mongoose = require("mongoose");

var { LOGIN } = require("../../constants/errors");

function checkDbConnection(req, res, next){
    if(mongoose.connection.readyState == 0){
        dispatchError(res,next,USER_ERRORS.DB_NOT_CONNECTED, 500);
    }else next()
}

module.exports.checkDbConnection = checkDbConnection;