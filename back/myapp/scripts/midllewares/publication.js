var { notifyAboutNewPublication }  = require( "../io/notice");
var { Publication } = require("../../models/Publication");
var { simpleErrorHandler, dispatchError, consoleLogErrorHandler } = require("../errorHandlers/common");
var { COMMON, USER_ERRORS } = require("../../constants/errors");
var { validatePublication } = require("../../scripts/validation")

function validatingPublication(req,res,next)
{
    let { publication } = req;
    publication.imageFile = req.files[0];
    let result = validatePublication(publication);
    
    if(result.isError == true){
        dispatchError(res, next, JSON.stringify(result,null, "\t"), 403);
        return;
    }
    
    next();
}

function savePublication(req,res,next){

    let newPub = {
        user: req.user._id,
        datePublication: Date.now(),
        textBody: req.publication.textBody,
        imageBody: req.savedFile ? req.savedFile.fileName : null
    };

    Publication.createPublication(newPub)
        .then(result => { 
            res.data = { message: "publication created" };
            notifyAboutNewPublication(req.user, result._doc);
            next();
        })
        .catch(err => {
            consoleLogErrorHandler(err);
            dispatchError(res,next, COMMON.DB_SAVE_ERROR, 503); 
        })
} 

function startToCreatePublication(req, res, next){
    req.publication = req.body;
    next();
}

module.exports.validatePublication = validatingPublication;
module.exports.savePublication = savePublication;
module.exports.startToCreatePublication = startToCreatePublication;