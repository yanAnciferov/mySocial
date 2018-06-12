var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var  userScheme = new Schema({
    firstName: {type: String, required: true },
    surName: {type: String, required: true },
    fatherName: {type: String, required: false },
    email: { type: String, unique: true, required: true },
    birthdate: { type: Date, required: false},
    password: { type: String, required: true},
    avatarUrl: { type: String, required: false, default: "http://www.zimphysio.org.zw/wp-content/uploads/2018/01/default-avatar-2.jpg"},
    id: { type: String, unique: true, required: true }
});



var User = mongoose.model("User", userScheme);

module.exports(User);

// user.save()
// .then(function(doc){
//     console.log("Сохранен объект", doc);
//     mongoose.disconnect();  // отключение от базы данных
// })
// .catch(function (err){
//     console.log(err);
//     mongoose.disconnect();
// });