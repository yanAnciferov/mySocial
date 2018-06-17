var express = require('express');
var router = express.Router();
var email = require("emailjs");
var emailExistence = require("email-existence")
//var im = require('imagemagick');
var bodyParser = require('body-parser');
var multer = require('multer');
var { User } = require('../models/User')
var fs = require('fs')
var sharp = require('sharp');
//var upload = multer({ dest: 'public/uploads/' });

var appEmail = require('../constants/email');

var { ACCOUNT } = require('../constants/apiUrl')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body, req.newUser)
    // let dir = "public/uploads/"
    // if (!fs.existsSync(dir)){
    //   fs.mkdirSync(dir);
    // }
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var uploads = multer({storage});



/* GET home page. */
router.get('/api/index', function(req, res, next) {
  res.send('index');
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


router.post("/api/account/registration", uploads.any(), [start, saveImage, checkMailForExistence, checkMailInDB, createUser, sendPasswordToEmail ] );
// 

function saveImage(req,res,next){
  console.log("sdf");
  if(req.files.length != 0)
    var image = req.files[0];
    console.log(req.newUser);

    const croped = sharp(image.path);
    croped.metadata()
    .then(metadata => {
      console.log(metadata);
      const left =  Number.parseInt((req.newUser.imageRect.x * metadata.width).toFixed()),
            top = Number.parseInt((req.newUser.imageRect.y * metadata.height).toFixed()),
            width =  Number.parseInt((req.newUser.imageRect.width * metadata.width).toFixed()), 
            height =   Number.parseInt((req.newUser.imageRect.height * metadata.height).toFixed());

      return croped
        .extract({ left, top, width, height})
        .toFile('output.jpg')

    })
    .then(data => {
    }).catch((error) => {
      console.log(error);
    });
  

    console.log("---------")
  

}

function start(req, res, next) {

  console.log(req)
  console.log(req.file)
  let newUser = {
    ...req.body,
    imageRect: JSON.parse(req.body.imageRect)
  }

  console.log(newUser);

  req.newUser = newUser;
  console.log("sdf")
  next();
}

function checkMailForExistence(req, res, next){

  console.log(req.newUser.email)
  emailExistence.check(req.newUser.email, (error, response) => {
    if(response == true){
      next();
    } else {
      res.statusCode = 403;
      console.log("Invalid email")
      res.send("Invalid email");
    }
  });
}

function checkMailInDB(req,res,next){
  User.findOne({email: req.newUser.email}, (err, user) => {
    if(user !== null){
      res.statusCode = 403;
      res.send("email busy");
      console.log("email busy")
    }else next();
  })
}


function createUser(req,res,next){

  let { newUser } = req;
  let password = Math.random().toString(36).slice(-8);
  newUser.password = password;

  User.createUser(newUser, (err, user) => {

      if (err){
            res.statusCode = 403;
            console.log(err);
            res.send(err);
      } else {
         next();
      }
  });
}


function sendPasswordToEmail(req,res,next){

  let { newUser } = req;

  var server 	= email.server.connect({
    user:     appEmail.email,
    password: appEmail.password,
    host:     "smtp.gmail.com",
    ssl:      true
 });

 server.send({
  from:    "Социальная сеть Яна Анциферова",
  to:       newUser.email,
  subject:	"Регистрация на сайте",
  attachment:
   [
      {data:`<html>
                <p>Здравствуйте, ${newUser.firstname}. Вы успешно прошли регистрацию на сайте.</p>
                <p>Ваш логин: ${newUser.email}<br/>
                   Ваш пароль: ${newUser.password}
                </p>
              </html>`, alternative:true}
   ]

}, (err, message) => {
  if(err){
      res.statusCode = 500;
      console.log(err);
      res.send();
  } else {
    res.send("ok");
  }
});

}


module.exports = router;
