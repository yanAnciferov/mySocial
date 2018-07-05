var express = require('express');
var router = express.Router();
var { verifyToken } = require('../scripts/midllewares/token')
var { getUserData } = require('../scripts/users')
var { checkDbConnection } = require('../scripts/midllewares/checkDbConnection')
var { API_METHODS_PATHS } = require("../constants/apiUrl");
var { simpleErrorHandler } = require("../scripts/errorHandlers/common")
var { getNews } = require("./../scripts/news")

router.get('/', [verifyToken, getNews])
        .use(simpleErrorHandler);

module.exports = router;