var { dispatchError } = require("../errorHandlers/common");
var { LOGIN } = require("../../constants/errors");
var { validatePassword } =  require("../validation");


function validationPassword(req, res, next){
    let { newPassword,oldPassword, confirmPassword } = req.body;
    let result = validatePassword(oldPassword, newPassword, confirmPassword);

    if(result.isError == true){
        dispatchError(res, next, JSON.stringify(result,null, "\t"), 403);
        return;
    }
    next();      
} 



function changePassword(req, res, next){
    
    try{
        let { user } = req;
        let { newPassword,oldPassword, confirmPassword } = req.body;
        if(user.checkPassword(oldPassword)){
            user.password = newPassword;
            user.save();
            res.sendStatus(200);
        }else {
            dispatchError(res, next, LOGIN.OLD_PASSWORD_IS_DIFFERENT, 403);
            return;
        }
    }catch(err){
        console.log(err);
    }
   
}

module.exports.validationPassword = validationPassword;
module.exports.changePassword = changePassword;