

const API = "/api";
const SERVER_DOMAIN = "localhost:3001";
const DEFAULT_AVATAR_PATH = "/uploads/";


const ACCOUNT = API + "/account";
const REGISTRATION = "/registration"
const LOGIN = "/login"
const GET_AUTHORIZE_USER_DATA = "/getAuthUserData"

const USERS = API + "/users";
const GET_USER_DATA = "/getUserData";



module.exports.API;
module.exports.SERVER_DOMAIN;
module.exports.DEFAULT_AVATAR_PATH;
module.exports.ACCOUNT = {
    CONTROLLER_NAME: ACCOUNT,
    REGISTRATION
};

module.exports.API_ROUTERS_PATHS = {
    ACCOUNT,
    USERS
}

module.exports.API_METHODS_PATHS = {
    GET_AUTHORIZE_USER_DATA,
    GET_USER_DATA,
    REGISTRATION,
    LOGIN
}