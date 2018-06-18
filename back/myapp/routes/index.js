var express = require('express');
var router = express.Router();
var multer = require('multer');
var { User } = require('../models/User')

var { start , checkMailInDB, createUser, checkMailForExistence  } = require('../scripts/registration');
var { sendPassword } = require('../scripts/email');
var { saveImage } = require('../scripts/image')

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


router.post("/api/account/registration", uploads.any(), [start, checkMailForExistence, checkMailInDB, createUser, sendPassword, saveImage ] );

module.exports = router;