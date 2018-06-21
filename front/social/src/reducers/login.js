import {HANDLE_CHANGE, SEX_CHANGE, ACTION_FOR_APP} from "../constans/ActionTypes"

import { ACTION_FOR_REGISTRATION, ACTION_FOR_LOGIN } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { DATE, MODEL_NAMES, MESSAGE, SEX_TYPES } from "../constans/registration"


import { COMMON_MESSAGE } from "../constans/common"

const initialState = {

    email: "",
    password: "",
    isValid: false,
    validateState: {
        email: {
            isError: false,
            message: MESSAGE.ENTER_EMAIL
        },
        password: {
            isError: false,
            message: MESSAGE.ENTER_PASSWORD
        }
    }
} 



export default function (state = initialState, action) {

    if(action.type == ACTION_FOR_LOGIN.LOGIN_ON_CHANGE){
        var { name, value} = action.payload;
        return {
            ...state,
            [name]: value
        }
    }

    if(action.type == ACTION_FOR_LOGIN.LOGIN_SUBMIT){
        var { password, email } = state; 
        var emailValid = {
                isError: email == "",
                message: MESSAGE.ENTER_EMAIL
            };
        var passwordValid = {
                isError: password == "",
                message: MESSAGE.ENTER_PASSWORD
            }

        return {
            ...state,
            validateState: {
                email: emailValid,
                password: passwordValid
            },
            isValid: !(passwordValid.isError || emailValid.isError)
        }
    }

    if(action.type == ACTION_FOR_LOGIN.LOGIN_QUERY_ERROR){
        var {err} = action;
        if(typeof err.response === "undefined")
            return state;

        var {data} = err.response;
        if(data == errors.INCORECT_EMAIL_FOR_LOGIN)
            return {
                ...state,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.USER_NOT_FOUND_ABOUT_EMAIL
                    }
                }
            }

        if(data == errors.INCORECT_PASSWORD_FOR_LOGIN)
            return {
                ...state,
                validateState: {
                    ...state.validateState,
                    password: {
                        isError: true,
                        message: MESSAGE.INCORRECT_PASSWORD
                    }
                }
            }

    }

    if(action.type === ACTION_FOR_APP.LOGIN){
        return initialState;
    }

    return state;
}