
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
    REGISTRATION_QUERY_ERROR
}


export const ACTION_COMMON = {

}

export const ACTION_FOR_LOGIN = {
    LOGIN_SUBMIT,
    LOGIN_ON_CHANGE
}

export const ACTION_FOR_APP = {
    CLOSE_ERROR_WINDOW,
    OPEN_ERROR_WINDOW,
    SHOW_LOADING_WINDOW,
    HIDE_LOADING_WINDOW
}
