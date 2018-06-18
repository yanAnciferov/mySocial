var appEmail = require('../constants/email');
var email = require("emailjs");

function sendPasswordToEmail(req,res,next){
  
    let { newUser } = req;
    var server 	= email.server.connect({
      user:     appEmail.email,
      password: appEmail.password,
      host:     "smtp.gmail.com",
      ssl:      true
   });
   console.log("!!!!")
  
   server.send({
    from:       "Социальная сеть Яна Анциферова",
    to:         newUser.email,
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
        res.statusCode = 403;
        console.log(err);
        res.send("failed send message to email");
    } else {
      next();
    }
  });
  
}

function sendPassword(req,res,next){
    sendPasswordToEmail(req,res,next);
}

module.exports.sendPassword = sendPassword;