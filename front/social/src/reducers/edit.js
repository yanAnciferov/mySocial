import {nameValidate, dateValidate, emailValidate, sexValidate , imageValidation} from "../scripts/validate"

import { ACTION_FOR_REGISTRATION, ACTION_FOR_EDIT } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { MODEL_NAMES, MESSAGE } from "../constans/registration"



const initialState = {

    [MODEL_NAMES.FIRSTNAME]: "",
    [MODEL_NAMES.SURNAME]: "",
    [MODEL_NAMES.PARRENTNAME]: "",
    [MODEL_NAMES.EMAIL]: "",
    [MODEL_NAMES.BIRTHDATE]: "",
    [MODEL_NAMES.SEX]: "",

  
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
        console.log(user)
        return {
            ...initialState,
            [MODEL_NAMES.FIRSTNAME]: user.firstname,
            [MODEL_NAMES.SURNAME]: user.surname,
            [MODEL_NAMES.PARRENTNAME]: user.parrentname,
            [MODEL_NAMES.EMAIL]: user.email,
            [MODEL_NAMES.BIRTHDATE]: user.birthdate,
            [MODEL_NAMES.SEX]: user.sex,
            
        }
    }
    else {
        console.log(user === false)
        return { ...initialState };
    }
}


export default function (state = initialState, action) {
    let actionTypes = ACTION_FOR_REGISTRATION;
   
    if(action.type === ACTION_FOR_EDIT.EDIT_ON_SUBMIT){
        let newValidateState = {
            ...state.validateState,
            [MODEL_NAMES.FIRSTNAME]: nameValidate(state.firstname,true, MODEL_NAMES.FIRSTNAME),
            [MODEL_NAMES.SURNAME]: nameValidate(state.surname,true, MODEL_NAMES.SURNAME),
            [MODEL_NAMES.PARRENTNAME]: nameValidate(state.parrentname,false, MODEL_NAMES.PARRENTNAME),
            [MODEL_NAMES.EMAIL]: emailValidate(state.email),
            [MODEL_NAMES.BIRTHDATE]: dateValidate(state.birthdate),
            [MODEL_NAMES.SEX]: sexValidate(state.sex)
        }

        let isFormValid = true;

        for(let field in newValidateState )
        {
            isFormValid = isFormValid && !newValidateState[field].isError
            if(!isFormValid) break;
        }

        return {
            ...state,
            validateState: newValidateState,
            isValid: isFormValid
        }
    }

    if(action.type === ACTION_FOR_EDIT.EDIT_ON_CHANGE){
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
    }

    if(action.type === "@@router/LOCATION_CHANGE" && action.payload.pathname == "/edit"){
        console.log("!!")
        return getInitState()
    }

    return state;
    
}