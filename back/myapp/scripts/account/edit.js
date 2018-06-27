var { deleteFiles, getPathToAvatars, getPathForRemove, deleteFilesByUrl } = require("../utils");

var { validateUser } = require("../validation");

var { dispatchError } = require( "../errorHandlers/common");
var { USER_ERRORS } = require( "../../constants/errors");

var { User } = require ("../../models/User");
var fs =  require("fs");
function saveEditUser(req,res,next){
    let {user, body} = req;

    User.findById(user._id, (err, user) => {
      if(!user || err){
        dispatchError(res, next, USER_ERRORS.NOT_FOUND , 403)
      }
      else 
      {
        for(field in body)
        {
            user[field] = body[field];
        }
        user.save(
            function (err, updatedUser) {
                if (err) return dispatchError(res,next, USER_ERRORS.NOT_FOUND, 403);
                //res.data = updatedUser;
                next();
          });
      }
    })
}

function startEdit(req, res, next){
    req.newUser = req.body;
    next();
}


function checkMailInDBForEdit(req,res,next){
    if(req.user.email === req.newUser.email){
        next();
        return;
    }
    User.findOne({email: req.newUser.email}, (err, user) => {
      if(!user){
        next();
      }
      else 
      { 
        dispatchError(res, next, USER_ERRORS.EMAIL_BUSY, 403);
      }
    })
}


function startUpdateAvatar(req, res, next){
    let newUser = {
        ...req.body,
        imageRect: JSON.parse(req.body.imageRect)
    }
    req.newUser = newUser;
    next();
  
}


function removeOldAvatars(req,res,next){
    if(req.user.avatar && req.user.minAvatar){
        deleteFilesByUrl(getPathForRemove(req.user));
    }
    next();
}


module.exports.saveEditUser = saveEditUser;
module.exports.startEdit = startEdit;
module.exports.checkMailInDBForEdit = checkMailInDBForEdit;
module.exports.startUpdateAvatar = startUpdateAvatar;
module.exports.removeOldAvatars = removeOldAvatars;