
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

module.exports.deleteFiles = deleteFiles;
module.exports.generateRandString = generateRandString;
module.exports.deleteFolder = deleteFolder;