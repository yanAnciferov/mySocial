
var mongoose = require('mongoose');
var crypto = require('crypto')
var Schema = mongoose.Schema;


var  userScheme = new Schema({
    firstname: {type: String, required: true },
    surname: {type: String, required: true },
    parrentname: {type: String, required: false },
    email: { type: String, unique: true, required: true },
    sex: { type: String, required: true },
    birthdate: { type: Date, required: false},
    hashPassword: { type: String, required: true},
    minAvatar: { type: String, default: null},
    avatar: { type: String, default: null},
    salt: {
        type: String,
        required: true
    }
});

userScheme.virtual("password")
    .set(function(password){
        console.log("!");
        this.salt = Math.random() + 'salt',
        this.hashPassword = this.encryptPassword(password);
    });

userScheme.methods = {
    encryptPassword(password){
        return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
    },
    checkPassword(password){
        return this.encryptPassword(password) === this.hashPassword;
    }

}

userScheme.statics = {
    createUser: function(user, callback){

        var User = this;
        var forNewUser = {
            firstname: user.firstname,
            parrentname: user.parrentname,
            surname: user.surname,
            sex: user.sex,
            email: user.email,
            birthdate: new Date(user.birthdate),
            password: user.password
        };
        var newUser = new User(forNewUser);

        newUser.save(callback);
    }
}


exports.User = mongoose.model("User", userScheme);

