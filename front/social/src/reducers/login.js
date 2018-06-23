import { ACTION_FOR_APP} from "../constans/ActionTypes"

import {  ACTION_FOR_LOGIN } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { MESSAGE } from "../constans/registration"


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

    if(action.type === ACTION_FOR_LOGIN.LOGIN_ON_CHANGE){
        let { name, value} = action.payload;
        return {
            ...state,
            [name]: value
        }
    }

    if(action.type === ACTION_FOR_LOGIN.LOGIN_SUBMIT){
        let { password, email } = state; 
        let emailValid = {
                isError: email === "",
                message: MESSAGE.ENTER_EMAIL
            };
        let passwordValid = {
                isError: password === "",
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

    if(action.type === ACTION_FOR_LOGIN.LOGIN_QUERY_ERROR){
        let {err} = action;
        if(!err.response)
            return state;

        let {data} = err.response;
        if(data === errors.INCORRECT_EMAIL_FOR_LOGIN)
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

        if(data === errors.INCORRECT_PASSWORD_FOR_LOGIN)
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