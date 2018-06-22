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
        if (err) console.log(err);
      });
  }
}

function getPathToImages({minAvatar, avatar, _id}){
  var pathToImage = `${paths.FULL_PATH_TO_USER_DATA}${_id.toString(16)}/` 
  return {
    minAvatar: (minAvatar !== null && minAvatar !== undefined) ? pathToImage + minAvatar : paths.PATH_TO_DEFAULT_AVATAR,
    avatar: (avatar !== null && avatar !== undefined) ? pathToImage + avatar : paths.PATH_TO_DEFAULT_AVATAR
  }
}

function updateImagePaths(user){
  var { minAvatar, avatar} = getPathToImages(user)
  user.minAvatar = minAvatar;
  user.avatar = avatar;
  return user;
}

module.exports.deleteFiles = deleteFiles;
module.exports.generateRandString = generateRandString;
module.exports.deleteFolder = deleteFolder;
module.exports.getPathToImages = getPathToImages;
module.exports.updateImagePaths = updateImagePaths;