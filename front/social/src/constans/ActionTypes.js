
const ON_SUBMIT = 'ON_SUBMIT'; 
const ON_CHANGE = 'ON_CHANGE';
const ON_IMAGE_LOAD = 'ON_IMAGE_LOAD';
const NEXT_STEP = 'NEXT_STEP';
const PREV_STEP = 'PREV_STEP';
const AVATAR_SUBMIT = 'AVATAR_SUBMIT';
const AVATAR_SKIP = 'AVATAR_SKIP';
const REGISTRATION_QUERY_START = "REGISTRATION_QUERY_START";
const REGISTRATION_QUERY_SUCCESS = "REGISTRATION_QUERY_SUCCESS";
const REGISTRATION_QUERY_ERROR = "REGISTRATION_QUERY_ERROR";
const CLOSE_ERROR_WINDOW = "CLOSE_ERROR_WINDOW";
const OPEN_ERROR_WINDOW = "OPEN_ERROR_WINDOW";
const SHOW_LOADING_WINDOW = "SHOW_LOADING_WINDOW";
const HIDE_LOADING_WINDOW = "HIDE_LOADING_WINDOW";

const LOGIN_SUBMIT = "LOGIN_SUBMIT";
const LOGIN_ON_CHANGE = "LOGIN_ON_CHANGE";
const LOGIN_QUERY_ERROR = "LOGIN_QUERY_ERROR";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const SET_USER_DATA = "SET_USER_DATA";
const SET_AUTH_USER_FRIENDS = "SET_AUTH_USER_FRIENDS";
const SET_USER_FRIENDS = "SET_USER_FRIENDS";


const LOAD_USER = "LOAD_USER";
const CURRENT_USER_SUCCESS = "CURRENT_USER_SUCCESS";
const CURRENT_USER_ERROR = "CURRENT_USER_ERROR";
const ON_SUCCESS_CLOSE = "ON_SUCCESS_CLOSE";

const EDIT_ON_CHANGE = "EDIT_ON_CHANGE";
const EDIT_ON_SUBMIT = "EDIT_ON_SUBMIT";

const EDIT_QUERY_START = "EDIT_QUERY_START";
const EDIT_QUERY_SUCCESS = "EDIT_QUERY_SUCCESS";
const EDIT_QUERY_ERROR = "EDIT_QUERY_ERROR";
const LOAD_AVATAR_OPEN = "LOAD_AVATAR_OPEN";

const ON_IMAGE_LOAD_TO_EDIT = "ON_IMAGE_LOAD_TO_EDIT";
const LOAD_AVATAR_CLOSE = "LOAD_AVATAR_CLOSE";
const ON_IMAGE_SUBMIT = "ON_IMAGE_SUBMIT";
const ON_IMAGE_RECT_CHANGE_TO_EDIT = "ON_IMAGE_RECT_CHANGE_TO_EDIT";
const AVATAR_UPDATE_QUERY_ERROR = "AVATAR_UPDATE_QUERY_ERROR";
const AVATAR_UPDATE_QUERY_SUCCESS = "AVATAR_UPDATE_QUERY_SUCCESS";
const ON_IMAGE_RECT_CHANGE_TO_REGISTRATION = "ON_IMAGE_RECT_CHANGE_TO_REGISTRATION";


const ON_SEARCH_SUCCESS = "ON_SEARCH_SUCCESS";
const ON_SEARCH_ERROR = "ON_SEARCH_ERROR";

const ON_QUERY_CHANGE = "ON_QUERY_CHANGE";

const TO_INCOMIG = "TO_INCOMIG";
const TO_OUTGOING = "TO_OUTGOING";
const TO_FRIEND = "TO_FRIEND";
const TO_NO_FRIEND = "TO_NO_FRIEND";

const ON_PUB_TEXT_CHANGE = "ON_PUB_TEXT_CHANGE";
const ON_PUB_SUBMIT = "ON_PUB_SUBMIT";
const ON_PUBLICATION_SUCCESS = "ON_PUBLICATION_SUCCESS"

const ON_ADD_PUBLICATION = "ON_ADD_PUBLICATION"
const ADD_PUBLICATIONS_TO_FEED = "ADD_PUBLICATIONS_TO_FEED"

const ON_ROUTE_LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

const PASSWORD_CHANGE = "PASSWORD_CHANGE";
const PASSWORD_SUBMIT = "PASSWORD_SUBMIT";
const PASSWORD_SUCCESS = "PASSWORD_SUCCESS";
const PASSWORD_ON_ERROR = "PASSWORD_ON_ERROR";

const LANGUAGE_CHANGE = "LANGUAGE_CHANGE";
const LANGUAGE_SUCCESS = "LANGUAGE_SUCCESS";


const MESSAGEBOX_CLOSE = "MESSAGEBOX_CLOSE";
const MESSAGEBOX_CALL = "MESSAGEBOX_CALL";

const DELETE_PUBLICATION = "DELETE_PUBLICATION";

export const ACTION_FOR_REGISTRATION = {
    ON_SUBMIT,
    ON_CHANGE,
    ON_IMAGE_LOAD,
    NEXT_STEP,
    PREV_STEP,
    AVATAR_SUBMIT,
    AVATAR_SKIP,
    REGISTRATION_QUERY_START,
    REGISTRATION_QUERY_SUCCESS,
    REGISTRATION_QUERY_ERROR,
    ON_SUCCESS_CLOSE,
    ON_IMAGE_RECT_CHANGE_TO_REGISTRATION

}

export const ACTION_FOR_PUBLICATION = {
    ON_PUB_SUBMIT,
    ON_PUB_TEXT_CHANGE,
    ON_PUBLICATION_SUCCESS
}


export const ACTION_COMMON = {
    ON_ROUTE_LOCATION_CHANGE
}

export const ACTION_FOR_EDIT = {
    EDIT_ON_CHANGE,
    EDIT_ON_SUBMIT,
    EDIT_QUERY_START,
    EDIT_QUERY_SUCCESS,
    EDIT_QUERY_ERROR,
    ON_IMAGE_LOAD_TO_EDIT,
    ON_IMAGE_SUBMIT,
    ON_IMAGE_RECT_CHANGE_TO_EDIT,
}

export const ACTION_FOR_PROFILE = {
    LOAD_USER,
    CURRENT_USER_ERROR,
    CURRENT_USER_SUCCESS,
    LOAD_AVATAR_OPEN,
    LOAD_AVATAR_CLOSE,
    AVATAR_UPDATE_QUERY_ERROR,
    AVATAR_UPDATE_QUERY_SUCCESS,
    SET_USER_FRIENDS,
    DELETE_PUBLICATION
   
}

export const ACTION_FOR_LOGIN = {
    LOGIN_SUBMIT,
    LOGIN_ON_CHANGE,
    LOGIN_QUERY_ERROR
}

export const ACTION_FOR_MESSAGEBOX = {
    MESSAGEBOX_CLOSE,
    MESSAGEBOX_CALL
}


export const ACTION_FOR_APP = {
    CLOSE_ERROR_WINDOW,
    OPEN_ERROR_WINDOW,
    SHOW_LOADING_WINDOW,
    HIDE_LOADING_WINDOW,
    LOGIN,
    LOGOUT,
    SET_USER_DATA,
    SET_AUTH_USER_FRIENDS,
    ON_ADD_PUBLICATION,
    LANGUAGE_CHANGE,
    LANGUAGE_SUCCESS
}


export const ACTION_FOR_SEARCH = {
    ON_SEARCH_SUCCESS,
    ON_SEARCH_ERROR,
    ON_QUERY_CHANGE
}


export const ACTION_FOR_FEED = {
    ADD_PUBLICATIONS_TO_FEED
}

export const ACTION_FOR_PASSWORD = {
    PASSWORD_CHANGE,
    PASSWORD_SUBMIT,
    PASSWORD_SUCCESS,
    PASSWORD_ON_ERROR
}


export const ACTION_FROM_SERVER = {
    TO_INCOMIG,
    TO_OUTGOING, 
    TO_FRIEND,
    TO_NO_FRIEND
}