var express = require('express');
var router = express.Router();
var multer = require('multer');
var jwt = require('jsonwebtoken');
var { User } = require('../models/User')

var { start, checkMailInDB, createUser, checkMailForExistence,
   validate,  clearRegistrationRequest, registrationError  } = require('../scripts/account/registration');
var { sendPassword } = require('../scripts/account/email');
var { saveImage } = require('../scripts/image')
var { verifyToken, login } = require('../scripts/account/login')
var { getUserData } = require('../scripts/account/account')
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

router.post("/registration", uploads.any(), [start, validate, checkMailForExistence, checkMailInDB, createUser, sendPassword, saveImage ])
        .use(registrationError);


router.post("/login", login);

router.post("/getUserData", verifyToken, getUserData);

module.exports = router;