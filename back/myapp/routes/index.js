//import { read } from 'fs';

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var uploads = multer({storage});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registration', uploads.any(), function(req, res, next) {
  console.log(req.body);
  console.log(req.files); 
  res.send("ok");
});


module.exports = router;
