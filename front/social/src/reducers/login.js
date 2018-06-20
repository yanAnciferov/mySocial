import {HANDLE_CHANGE, SEX_CHANGE} from "../constans/ActionTypes"

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
        
        console.log(state)
        
        return {
            ...state,
            validateState: {
                email: emailValid,
                password: passwordValid
            },
            isValid: !(passwordValid.isError && emailValid.isError)
        }
    }

    return state;
}