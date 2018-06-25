var {generateRandString} = require("../scripts/utils");
var {paths} = require("../constants/common");
var { User } = require('../models/User')
var sharp = require('sharp');
var fs = require('fs')
var mongoose = require("mongoose");
var { USER_ERRORS } = require("../constants/errors");


function saveImage(req,res,next){

   
    var { newUser } = req;

    User.findOne({email: newUser.email}, (err, result) => {
    var userFromDb = result;

    

    let id = userFromDb._id.toString(16)
    let dir = `${paths.PATH_TO_USER_DATA}${id}`
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);

    if(req.files.length == 0){
        next();
        return;
    }else {
        var image = req.files[0];
    }

    const croped = sharp(image.path);

    croped.metadata()
    .then(metadata => {
        const rectForCrop = 
            { 
                left: Number.parseInt((newUser.imageRect.x * metadata.width).toFixed()),
                top: Number.parseInt((newUser.imageRect.y * metadata.height).toFixed()),
                width: Number.parseInt((newUser.imageRect.width * metadata.width).toFixed()), 
                height: Number.parseInt((newUser.imageRect.height * metadata.height).toFixed())
            }

        let minAvatar = `${generateRandString(32, -10)}.${metadata.format}`;
        let avatar = `${generateRandString(32, -10)}.${metadata.format}`;

        Promise.all( [croped.extract(rectForCrop).toFile(`${dir}/${avatar}`),
                      croped.extract(rectForCrop).resize(300,300).toFile(`${dir}/${minAvatar}`)])
               .then(value => {
                User.update({email: newUser.email}, {avatar, minAvatar}, function(err, result){
                    if(err) return console.log(err);
                    else next()
                });
                fs.unlink(image.path);
                
               })
        
    })
    .then(data => {
    }).catch((error) => {
        User.deleteOne({email: newUser.email});
        res.statusCode = 403;
        next(USER_ERRORS.SAVE_FILE_ERROR);
    });
    })
}

module.exports.saveImage = saveImage;