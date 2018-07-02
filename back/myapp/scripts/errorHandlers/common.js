function dispatchError(res,next, err, code){
    res.statusCode = code;
    res.message = err;
    next(err);
}

function simpleErrorHandler(err,req,res,next){
    res.send(res.message);
}

function consoleLogErrorHandler(err){
    console.log(err);
}

module.exports.dispatchError = dispatchError;
module.exports.simpleErrorHandler = simpleErrorHandler;
module.exports.consoleLogErrorHandler = consoleLogErrorHandler;