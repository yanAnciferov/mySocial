var { consoleLogErrorHandler }  = require('./errorHandlers/common');

var { setTimeout } = require( 'timers');

var { paths } = require('../constants/common');
var fs = require('fs');

function generateRandString(radix = 36, slice = -8){
   return Math.random().toString(radix).slice(slice);
}

function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

function deleteFiles(files){
    for(var file in files){
      file = files[file];
      fs.unlink(file.path, (err) => {
        if (err) consoleLogErrorHandler(err);
      });
  }
}

function deleteFilesByUrl(Urls){
  for(var url in Urls){
    fs.unlink(Urls[url], (err) => {
      if (err) consoleLogErrorHandler(err);
    });
}
}


function buildPathToImage(image, id){
  return `${paths.FULL_PATH_TO_USER_DATA}${id.toString(16)}/${image}`;
}

function getPathToAvatars({minAvatar, avatar, _id}){
  let pathToImage = `${paths.FULL_PATH_TO_USER_DATA}${_id.toString(16)}/` 
  return {
    minAvatar: (minAvatar) ? pathToImage + minAvatar : paths.PATH_TO_DEFAULT_AVATAR,
    avatar: (avatar) ? pathToImage + avatar : paths.PATH_TO_DEFAULT_AVATAR
  }
}

function getPathForRemove({minAvatar, avatar, _id}){
  let pathToImage = `${paths.PATH_TO_USER_DATA}${_id.toString(16)}/` 
  return {
    minAvatar: pathToImage + minAvatar,
    avatar: pathToImage + avatar
  }
}

function updateUserAvatarPaths(user){
  let { minAvatar, avatar} = getPathToAvatars(user)
  user.minAvatar = minAvatar;
  user.avatar = avatar;
  return user;
}



module.exports.deleteFiles = deleteFiles;
module.exports.generateRandString = generateRandString;
module.exports.deleteFolder = deleteFolder;
module.exports.getPathToAvatars = getPathToAvatars;
module.exports.updateUserAvatarPaths = updateUserAvatarPaths;
module.exports.getPathForRemove = getPathForRemove;
module.exports.deleteFilesByUrl = deleteFilesByUrl;
module.exports.buildPathToImage = buildPathToImage;