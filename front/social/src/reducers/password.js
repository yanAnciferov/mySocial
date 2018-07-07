import { ACTION_FOR_APP, ACTION_FOR_PASSWORD, ACTION_COMMON} from "../constans/ActionTypes"

import {  ACTION_FOR_LOGIN } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { MESSAGE, PASSWORD_MESSAGES } from "../constans/registration"
import { passwordValidation } from "../scripts/validate";
import { MENU_LINKS } from "../constans/common";
import login from "../content/login";


const initialState = {

    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    isValid: false,
    isSuccess: false,
    validateState: {
        oldPassword: {
            isError: false,
            message: PASSWORD_MESSAGES.ENTER_OLD_PASSWORD
        },
        newPassword: {
            isError: false,
            message: PASSWORD_MESSAGES.ENTER_NEW_PASSWORD
        },
        confirmPassword: {
            isError: false,
            message: PASSWORD_MESSAGES.ENTER_CONFIRM_PASSWORD
        }
    }
} 



export default function (state = initialState, action) {

    if(action.type === ACTION_FOR_PASSWORD.PASSWORD_CHANGE){
        let { name, value} = action.payload;
        return {
            ...state,
            [name]: value,
            isSuccess: false
        }
    }

   
    if(action.type === ACTION_FOR_PASSWORD.PASSWORD_SUBMIT){
        let validateResult = passwordValidation(state);
        let { isValid:isFormValid, newValidateState } = validateResult;

        return {
            ...state,
            validateState: newValidateState,
            isValid: isFormValid
        }
    }

    if(action.type === ACTION_FOR_PASSWORD.PASSWORD_ON_ERROR && action.err.response.data == "password is different"){
        
        let newOldPasswordState = state.validateState.oldPassword;
        newOldPasswordState.isError = true;
        newOldPasswordState.message = [];
        newOldPasswordState.message.push(MESSAGE.INCORRECT_PASSWORD);
        return {
            ...state,
            validateState: {
                ...state.validateState,
                oldPassword: newOldPasswordState
            }
        }
        
    }

    if(action.type === ACTION_FOR_PASSWORD.PASSWORD_SUCCESS){
        return {
            ...initialState,
            isSuccess: true
        }
    }

    if(action.type === ACTION_COMMON.ON_ROUTE_LOCATION_CHANGE && action.payload.pathname !== MENU_LINKS.SETTINGS )
        return initialState;

    return state;
}