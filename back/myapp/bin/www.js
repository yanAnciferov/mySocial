var app = require('../app');
var debug = require('debug')('myapp:server');
var server = require('http').createServer(app);
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cors = require('cors');
var { simpleErrorHandler } = require("../scripts/errorHandlers/common")
var mongoose = require('mongoose');
var io = require("socket.io")(server);
var onConnection = require("../scripts/io/io")

router.use(bodyParser.json()); 

router.use(bodyParser.urlencoded({ extended: true })); 

router.use(upload.array()); 
router.use(express.static('public'));


mongoose.connect('mongodb://localhost/social')
  .then(() => { console.log("mongo started");})
  .catch(e => console.log(e))

  


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}




io.on('connection', (socket) => { onConnection(socket, io) });
