import {HANDLE_CHANGE, SEX_CHANGE} from "../constans/ActionTypes"
import {nameValidate, dateValidate, emailValidate, sexValidate , imageValidation} from "../components/pages/registration/validate"

import * as actionTypes from "../constans/ActionTypes"

import { DATE, MODEL_NAMES, MESSAGE, SEX_TYPES } from "../constans/registration"

const initialState = {

    [MODEL_NAMES.FIRSTNAME]: "",
    [MODEL_NAMES.SURNAME]: "",
    [MODEL_NAMES.PARRENTNAME]: "",
    [MODEL_NAMES.EMAIL]: "",
    [MODEL_NAMES.BIRTHDATE]: "",
    [MODEL_NAMES.SEX]: "",

    image: {
        file: null,
        rect: null
    },

    step: 0,
    isLoading: false,
    isValid: false,
    
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
        },
        image: {
            isError: false,
            message: MESSAGE.ENTER_FILE
        }
    }
} 



export default function (state = initialState, action) {
    
    if(action.type === actionTypes.ON_SUBMIT){

        var newValidateState = {
            ...state.validateState,
            [MODEL_NAMES.FIRSTNAME]: nameValidate(state.firstname,true, MODEL_NAMES.FIRSTNAME),
            [MODEL_NAMES.SURNAME]: nameValidate(state.surname,true, MODEL_NAMES.SURNAME),
            [MODEL_NAMES.PARRENTNAME]: nameValidate(state.parrentname,false, MODEL_NAMES.PARRENTNAME),
            [MODEL_NAMES.EMAIL]: emailValidate(state.email),
            [MODEL_NAMES.BIRTHDATE]: dateValidate(state.birthdate),
            [MODEL_NAMES.SEX]: sexValidate(state.sex)
        }

        var isFormValid = true;

        for(var field in newValidateState )
        {
            isFormValid = isFormValid && !newValidateState[field].isError
            if(!isFormValid) break;
        }

        var newStep;

        if(isFormValid) newStep = state.step + 1;
        else newStep = state.step;

        return {
            ...state,
            validateState: newValidateState,
            step: newStep,
            isValid: isFormValid
        }
    }

    if(action.type === actionTypes.ON_CHANGE){
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
    }

    if(action.type === actionTypes.ON_IMAGE_LOAD){
        
        var image = {
            file: action.payload
        }

        return {
            ...state,
            image,
            validateState: {
                ...state.validateState,
                image: imageValidation(action.payload, false)
            }
        }
    }

    if(action.type === actionTypes.PREV_STEP){
        return {
            ...state,
            step: state.step - 1
        }
    }

    if(action.type === actionTypes.AVATAR_SUBMIT){

        var imageValide = imageValidation(state.image.file, true)
        var isValid;
        if(imageValide.isError)
            isValid = false        
        else isValid = true
        console.log(imageValide)
        return {
            ...state,
            isValid,
            image: {
                ...state.image,
                rect: action.payload
            },
            validateState: {
                ...state.validateState,
                image: imageValide
            }
        }        
    }


    if(action.type === actionTypes.AVATAR_SKIP){
        var imageValide = imageValidation(state.image.file, false)
        var isValid;
        if(imageValide.isError)
            isValid = false        
        else isValid = true
        console.log(imageValide)
        return {
            ...state,
            isValid,
            validateState: {
                ...state.validateState,
                image: imageValide
            }
        }       
    }

    if(action.type === actionTypes.REGISTRATION_QUERY_START){
        return {
            ...state,
           isLoading: true
        }    
    }

    if(action.type === actionTypes.REGISTRATION_QUERY_ERROR){
        if(action.err.response == undefined)
        return {
            ...state,
            isLoading: false,
            step: 0
        } 

        if(action.err.response.data == "Invalid email")
            return {
                ...state,
                isLoading: false,
                step: 0,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.EMAIL_NOT_EXISTENCE
                    }
                }
            } 

        if(action.err.response.data == "email busy")
            return {
                ...state,
                isLoading: false,
                step: 0,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.EMAIL_BUSY
                    }
                }
            } 

        return {
            ...state,
            isLoading: false,
            step: 0
        } 

    }

    if(action.type === actionTypes.REGISTRATION_QUERY_SUCCESS){
        return {
            ...state,
           isLoading: false,
           step: ++state.step
        } 
    }

    return state;
    
}