var { validatePublication, savePublication }  = require('../scripts/midllewares/publication');
var { saveImageSimple }  = require('../scripts/image');
var { startToCreatePublication }  = require('../scripts/midllewares/publication');

var { checkMailInDBForEdit, startUpdateAvatar, removeOldAvatars } = require('../scripts/account/edit');
var { saveEditUser }  = require('../scripts/account/edit');
var { startEdit } = require('../scripts/account/edit');
var { finishSend } = require('../scripts/midllewares/common');
var express = require('express');
var multer = require('multer');
var jwt = require('jsonwebtoken');
var { start, checkMailInDB, createUser, checkMailForExistence,
   validate,  clearRegistrationRequest } = require('../scripts/account/registration');
var { registrationError } = require('../scripts/errorHandlers/account')
var { simpleErrorHandler } = require("../scripts/errorHandlers/common")
var { sendPassword } = require('../scripts/account/email');
var { saveImage } = require('../scripts/image')
var { login } = require('../scripts/account/login')
var { createAndSendToken, createToken } = require("../scripts/midllewares/token")
var { verifyToken } = require('../scripts/midllewares/token')
var { getAuthUserData, addFriendsToUser } = require('../scripts/account/account')
var { API_METHODS_PATHS } = require('../constants/apiUrl')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var uploads = multer({storage});

var router = express.Router();

router.use(simpleErrorHandler)

router.post(API_METHODS_PATHS.REGISTRATION, uploads.any(), [start, validate, checkMailForExistence, 
  checkMailInDB, createUser, sendPassword, saveImage, createToken, getAuthUserData, finishSend ])
        .use(registrationError);

router.post(API_METHODS_PATHS.LOGIN, [login, createAndSendToken])
        .use(simpleErrorHandler);

router.get(API_METHODS_PATHS.GET_AUTHORIZE_USER_DATA, verifyToken, [getAuthUserData, addFriendsToUser, finishSend])
        .use(simpleErrorHandler);


router.post(API_METHODS_PATHS.EDIT, verifyToken ,[startEdit, checkMailInDBForEdit, checkMailForExistence, saveEditUser, getAuthUserData, finishSend]).use(simpleErrorHandler);

router.post(API_METHODS_PATHS.UPDATE_AVATAR, uploads.any(), [verifyToken, startUpdateAvatar, saveImage, removeOldAvatars,getAuthUserData, finishSend ]).use(simpleErrorHandler);


router.post("/newPublication", uploads.any(), [verifyToken, startToCreatePublication ,validatePublication, saveImageSimple, savePublication, finishSend ])
        .use(simpleErrorHandler);
module.exports = router;