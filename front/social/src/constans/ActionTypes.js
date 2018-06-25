
const ON_SUBMIT = 'ON_SUBMIT' 
const ON_CHANGE = 'ON_CHANGE' 
const ON_IMAGE_LOAD = 'ON_IMAGE_LOAD'
const NEXT_STEP = 'NEXT_STEP'
const PREV_STEP = 'PREV_STEP'
const AVATAR_SUBMIT = 'AVATAR_SUBMIT'
const AVATAR_SKIP = 'AVATAR_SKIP'
const REGISTRATION_QUERY_START = "REGISTRATION_QUERY_START"
const REGISTRATION_QUERY_SUCCESS = "REGISTRATION_QUERY_SUCCESS"
const REGISTRATION_QUERY_ERROR = "REGISTRATION_QUERY_ERROR"
const CLOSE_ERROR_WINDOW = "CLOSE_ERROR_WINDOW"
const OPEN_ERROR_WINDOW = "OPEN_ERROR_WINDOW"
const SHOW_LOADING_WINDOW = "SHOW_LOADING_WINDOW"
const HIDE_LOADING_WINDOW = "HIDE_LOADING_WINDOW"

const LOGIN_SUBMIT = "LOGIN_SUBMIT"
const LOGIN_ON_CHANGE = "LOGIN_ON_CHANGE"
const LOGIN_QUERY_ERROR = "LOGIN_QUERY_ERROR"

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

const SET_USER_DATA = "SET_USER_DATA"

const LOAD_USER = "LOAD_USER"
const CURRENT_USER_SUCCESS = "CURRENT_USER_SUCCESS"
const CURRENT_USER_ERROR = "CURRENT_USER_ERROR"
const ON_SUCCESS_CLOSE = "ON_SUCCESS_CLOSE"

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
    ON_SUCCESS_CLOSE
}


export const ACTION_COMMON = {

}

export const ACTION_FOR_PROFILE = {
    LOAD_USER,
    CURRENT_USER_ERROR,
    CURRENT_USER_SUCCESS
}

export const ACTION_FOR_LOGIN = {
    LOGIN_SUBMIT,
    LOGIN_ON_CHANGE,
    LOGIN_QUERY_ERROR
}

export const ACTION_FOR_APP = {
    CLOSE_ERROR_WINDOW,
    OPEN_ERROR_WINDOW,
    SHOW_LOADING_WINDOW,
    HIDE_LOADING_WINDOW,
    LOGIN,
    LOGOUT,
    SET_USER_DATA

}
