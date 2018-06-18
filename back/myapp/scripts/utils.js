
var fs = require('fs');

function generateRandString(radix = 36, slice = -8){
   return Math.random().toString(radix).slice(slice);
}

function deleteFolder(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

module.exports.generateRandString = generateRandString;
module.exports.deleteFolder = deleteFolder;