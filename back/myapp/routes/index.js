
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var { User } = require('../models/User')
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

router.get('/all', function(req, res, next) {

  User.find({}, function(err, users) {
    var userMap = [];

    users.forEach(function(user) {
      userMap.push(user);
    });

    res.send(userMap);  
  });
});

router.post('/registration', uploads.any(), function(req, res, next) {

  let newUser = {
    ...req.body,
    imageRect: JSON.parse(req.body.imageRect)
  }


  var password = Math.random().toString(36).slice(-8);
  newUser.password = password;


  User.createUser(newUser, (err, user) => {

      if (err){
          if (err === 403){
              res.send(err);
          }else{
              res.send(err);
          }
      } else {
          console.log("eee");
          res.send({
            password
          })
      }
  });


  res.send("ok");
});


module.exports = router;
