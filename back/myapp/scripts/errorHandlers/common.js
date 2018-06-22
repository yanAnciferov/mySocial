function dispatchError(res,next, err, code){
    res.statusCode = code;
    res.message = err;
    next(err);
}

function simpleErrorHandler(err,req,res,next){
    console.log(res.message)
    res.send(res.message);
}


module.exports.dispatchError = dispatchError;
module.exports.simpleErrorHandler = simpleErrorHandler;