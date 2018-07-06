const FIRSTNAME = "firstname"
const SURNAME = "surname"
const PARRENTNAME = "parrentname"
const EMAIL = "email"
const SEX = "sex"
const BIRTHDATE = "birthdate"
const IMAGE = "image"
const RECT = "rect"

const USER = "User";
const PUBLICATION = "Publication";
const FRIEND_STATE = "FriendState"

module.exports.MODEL_NAMES = {
    USER,
    PUBLICATION,
    FRIEND_STATE
}

module.exports.USER = {
    FIRSTNAME,
    SURNAME,
    PARRENTNAME,
    EMAIL,
    SEX,
    BIRTHDATE,
    IMAGE,
    RECT
}



module.exports.PUBLICATION = {
    USER: 'user'
}