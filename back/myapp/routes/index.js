var express = require('express');
var router = express.Router();
var multer = require('multer');
var { User } = require('../models/User')

var { start , checkMailInDB, createUser, checkMailForExistence, validate,  clearRegistrationRequest  } = require('../scripts/registration');
var { sendPassword } = require('../scripts/email');
var { saveImage } = require('../scripts/image')
var fs = require('fs')

var {deleteFolder} = require('../scripts/utils')
var {paths} = require("../constants/common")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var uploads = multer({storage});

router.get('/all', function(req, res, next) {

  User.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push(user);
    });

    res.send(userMap);
  });
});


router.post("/api/account/registration", uploads.any(), [start, validate, checkMailForExistence, checkMailInDB, createUser, sendPassword, saveImage ])
        .use(function(err,req,res,next){
            console.log("ERROR", err)
            clearRegistrationRequest(req);
            res.send(res.message);
            return;
          });

module.exports = router;