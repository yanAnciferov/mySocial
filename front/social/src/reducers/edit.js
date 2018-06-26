import {validate} from "../scripts/validate"

import { ACTION_FOR_EDIT } from "../constans/ActionTypes"

import { MODEL_NAMES, MESSAGE } from "../constans/registration"
import { errors } from "../constans/errors";



const initialState = {

    [MODEL_NAMES.FIRSTNAME]: "",
    [MODEL_NAMES.SURNAME]: "",
    [MODEL_NAMES.PARRENTNAME]: "",
    [MODEL_NAMES.EMAIL]: "",
    [MODEL_NAMES.BIRTHDATE]: "",
    [MODEL_NAMES.SEX]: "",

    isChanged: false,
    isValid: true,
    validateState: {
        [MODEL_NAMES.FIRSTNAME]: {
            isError: false,
            message: MESSAGE.ENTER_NAME
        },
        [MODEL_NAMES.SURNAME]: {
            isError: false,
            message: MESSAGE.ENTER_SURNAME
        },
        [MODEL_NAMES.PARRENTNAME]: {
            isError: false,
            message: MESSAGE.ENTER_PARRENTNAME
        },
        [MODEL_NAMES.EMAIL]: {
            isError: false,
            message: MESSAGE.ENTER_EMAIL
        },
        [MODEL_NAMES.BIRTHDATE]: {
            isError: false,
            message: MESSAGE.ENTER_BIRTHDATE
        },
        [MODEL_NAMES.SEX]: {
            isError: false,
            message: MESSAGE.ENTER_SEX
        }
    }
} 


function getInitState(){
    let user = JSON.parse(localStorage.getItem("userData"));
    
    if(user){
        return {
            ...initialState,
            [MODEL_NAMES.FIRSTNAME]: user.firstname,
            [MODEL_NAMES.SURNAME]: user.surname,
            [MODEL_NAMES.PARRENTNAME]: user.parrentname,
            [MODEL_NAMES.EMAIL]: user.email,
            [MODEL_NAMES.BIRTHDATE]: user.birthdate.substr(0,10),
            [MODEL_NAMES.SEX]: user.sex,
            
        }
    }
    else {
        console.log(user === false)
        return { ...initialState };
    }
}


export default function (state = initialState, action) {   
    if(action.type === ACTION_FOR_EDIT.EDIT_ON_SUBMIT){
        let { newValidateState, isValid } = validate(state);

        return {
            ...state,
            validateState: newValidateState,
            isValid: isValid
        }
    }

    if(action.type === ACTION_FOR_EDIT.EDIT_ON_CHANGE){
        return {
            ...state,
            isChanged: true,
            [action.payload.name]: action.payload.value
        }
    }

    if(action.type === "@@router/LOCATION_CHANGE" && action.payload.pathname === "/edit"){
        return getInitState()
    }

    if(action.type === ACTION_FOR_EDIT.EDIT_QUERY_ERROR)
    {
        let { err: { response }} = action;
        if(response.data === errors.INVALID_EMAIL)
            return {
                ...state,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.EMAIL_NOT_EXISTENCE
                    }
                }
            } 

        if(response.data === errors.EMAIL_BUSY)
            return {
                ...state,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.EMAIL_BUSY
                    }
                }
            }
    }


    return state;
    
}