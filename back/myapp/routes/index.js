var express = require('express');
var router = express.Router();
var multer = require('multer');
var jwt = require('jsonwebtoken');
var { User } = require('../models/User')

var { start, checkMailInDB, createUser, checkMailForExistence,
   validate,  clearRegistrationRequest } = require('../scripts/account/registration');
var { registrationError } = require('../scripts/errorHandlers/registration')
var { simpleErrorHandler } = require("../scripts/errorHandlers/common")
var { sendPassword } = require('../scripts/account/email');
var { saveImage } = require('../scripts/image')
var { login } = require('../scripts/account/login')
var { verifyToken } = require('../scripts/midllewares/token')
var { getAuthUserData } = require('../scripts/account/account')
var { checkDbConnection } = require('../scripts/midllewares/checkDbConnection')
var fs = require('fs')
var { API_METHODS_PATHS } = require('../constants/apiUrl')
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

router.use(simpleErrorHandler)

router.post(API_METHODS_PATHS.REGISTRATION, uploads.any(), [checkDbConnection, start, validate, checkMailForExistence, checkMailInDB, createUser, sendPassword, saveImage ])
        .use(registrationError);

router.post(API_METHODS_PATHS.LOGIN, [checkDbConnection, login])
        .use(simpleErrorHandler);
        
router.post(API_METHODS_PATHS.GET_AUTHORIZE_USER_DATA, verifyToken, [checkDbConnection, getAuthUserData])
        .use(simpleErrorHandler);

module.exports = router;