var email = require("emailjs");
var emailExistence = require("email-existence")
var mongoose = require("mongoose");
var { User } = require('../models/User')
var fs = require('fs')
var sharp = require('sharp');
var appEmail = require('../constants/email');

function start(req, res, next) {
    let newUser = {
      ...req.body,
      imageRect: JSON.parse(req.body.imageRect)
    }
  
    req.newUser = newUser;
    next();
  }
  
  function checkMailForExistence(req, res, next){
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
        res.send("Invalid email");
    } else {
      next();
    }
  });
  
  }
  
  function saveImage(req,res,next){
    if(req.files.length != 0){
  
      var image = req.files[0];
      var { newUser } = req;
  
      User.findOne({email: newUser.email}, (err, result) => {
        var userFromDb = result;
  
        const croped = sharp(image.path);
  
        croped.metadata()
        .then(metadata => {
          const rectForCrop = 
              { 
                left: Number.parseInt((newUser.imageRect.x * metadata.width).toFixed()),
                top: Number.parseInt((newUser.imageRect.y * metadata.height).toFixed()),
                width: Number.parseInt((newUser.imageRect.width * metadata.width).toFixed()), 
                height: Number.parseInt((newUser.imageRect.height * metadata.height).toFixed())
              }
  
         let id = userFromDb._id.toString(16)
         let minAvatar = `${Math.random().toString(36).slice(-10)}.${metadata.format}`;
         let avatar = `${Math.random().toString(36).slice(-10)}.${metadata.format}`;
         let dir = `./public/usersData/${id}`
  
         if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
        }
          croped.extract(rectForCrop)
              .toFile(`${dir}/${avatar}`).then(data=>console.log(data)).catch(err=>console.log(err))
  
          croped.extract(rectForCrop)
              .resize(300,300)
              .toFile(`${dir}/${minAvatar}`).then(data=>console.log(data)).catch(err=>console.log(err))
  
          User.update({email: newUser.email}, {avatar, minAvatar}, function(err, result){
              mongoose.disconnect();
              if(err) return console.log(err);
          });
  
        })
        .then(data => {
          res.send("ok");
        }).catch((error) => {
          console.log(error);
          res.statusCode = 403;
          res.send("save file error");
        });
      })
    }
    
  }



module.exports.start = start;
module.exports.checkMailForExistence = checkMailForExistence;
module.exports.checkMailInDB = checkMailInDB;
module.exports.createUser = createUser;
module.exports.sendPasswordToEmail = sendPasswordToEmail;
module.exports.saveImage = saveImage;