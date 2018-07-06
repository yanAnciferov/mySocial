var { simpleErrorHandler } = require('./scripts/errorHandlers/common');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var account = require('./routes/account');
var search = require('./routes/search')
var usersRouter = require('./routes/users');
var feedRouter = require('./routes/feed');
var { API_ROUTERS_PATHS } = require("./constants/apiUrl")
var app = express();
var { checkDbConnection } = require('./scripts/midllewares/checkDbConnection')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, Authorization'); 
  next();
});

app.use(checkDbConnection);
app.use(API_ROUTERS_PATHS.SEARCH, search);
app.use(API_ROUTERS_PATHS.ACCOUNT, account);
app.use(API_ROUTERS_PATHS.USER, usersRouter);
app.use(API_ROUTERS_PATHS.FEED, feedRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
