var { USER_ERRORS } = require("../../constants/errors");
var mongoose = require("mongoose");

var { LOGIN } = require("../../constants/errors");

function checkDbConnection(req, res, next){
    if(mongoose.connection.readyState == 0){
        res.statusCode = 500;
        res.message = USER_ERRORS.DB_NOT_CONNECTED;
        next(res.message)
    }else next()
}

module.exports.checkDbConnection = checkDbConnection;