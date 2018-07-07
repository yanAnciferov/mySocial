const API = "/api";
const SERVER_DOMAIN = "localhost:3001";
const DEFAULT_AVATAR_PATH = "/uploads/";


const ACCOUNT = API + "/account";
const REGISTRATION = "/registration";
const LOGIN = "/login";
const GET_AUTHORIZE_USER_DATA = "/getAuthUserData";
const CHANGE_PASSWORD = "/changePassword";

const USER = API + "/user";
const GET_USER_DATA = "/getUserData";
const EDIT = "/edit"
const UPDATE_AVATAR = "/updateAvatar"
const GET_USER_FRIEND_LIST = "/getUserFriendList"
const NEW_PUBLICATION = "/newPublication";

const SEARCH = API + "/search";

const FEED = API + "/feed";

module.exports.API;
module.exports.SERVER_DOMAIN;
module.exports.DEFAULT_AVATAR_PATH;
module.exports.ACCOUNT = {
    CONTROLLER_NAME: ACCOUNT,
    REGISTRATION
};

module.exports.API_ROUTERS_PATHS = {
    ACCOUNT,
    USER,
    SEARCH,
    FEED
}

module.exports.API_METHODS_PATHS = {
    GET_AUTHORIZE_USER_DATA,
    GET_USER_DATA,
    REGISTRATION,
    LOGIN,
    EDIT,
    UPDATE_AVATAR,
    GET_USER_FRIEND_LIST,
    NEW_PUBLICATION,
    CHANGE_PASSWORD
}