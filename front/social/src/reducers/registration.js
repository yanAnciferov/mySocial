import {imageValidation,validate} from "../scripts/validate"

import { ACTION_FOR_REGISTRATION } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { MODEL_NAMES, MESSAGE } from "../constans/registration"



const initialState = {

    [MODEL_NAMES.FIRSTNAME]: "",
    [MODEL_NAMES.SURNAME]: "",
    [MODEL_NAMES.PARRENTNAME]: "",
    [MODEL_NAMES.EMAIL]: "",
    [MODEL_NAMES.BIRTHDATE]: "",
    [MODEL_NAMES.SEX]: "",

    image: {
        file: null,
        rect: { x: 0, y: 0, width: 1, height: 1 }
    },

    step: 0,
    isValid: false,
    isSuccessWindowShow: false,
    isAvatarSkip: false,   
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
    let actionTypes = ACTION_FOR_REGISTRATION;
    if(action.type === actionTypes.ON_SUBMIT){


        let validateResult = validate(state);
        let { isValid:isFormValid, newValidateState } = validateResult;

        let newStep;

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
        
        let imageValidationResult = imageValidation(action.payload, false);

        let newImage = {
            ...state.image,
            file: imageValidationResult.isError ? null : action.payload
        }

        return {
            ...state,
            image: newImage,
            validateState: {
                ...state.validateState,
                image: imageValidationResult
            }
        }
    }

    if(action.type === actionTypes.ON_SUCCESS_CLOSE){
        return {
            ...state,
            isSuccessWindowShow: false
        }
    }

    if(action.type === actionTypes.PREV_STEP){
        return {
            ...state,
            step: state.step - 1
        }
    }

    if(action.type === actionTypes.AVATAR_SUBMIT){

        let imageValide = imageValidation(state.image.file, true)
        let isValid;
        if(imageValide.isError)
            isValid = false        
        else isValid = true
        
        return {
            ...state,
            isValid,
            validateState: {
                ...state.validateState,
                image: imageValide
            }
        }        
    }


    if(action.type === actionTypes.AVATAR_SKIP){
        return {
            ...state,
            isValid: true,
            isAvatarSkip: true
        }       
    }


    if(action.type === actionTypes.REGISTRATION_QUERY_ERROR){
        
        let {err} = action;
        let {response} = err;
        if(err.message === errors.NETWORK_ERROR || !response  || response.data === errors.DB_NOT_CONNECTED)
            return {
                ...state,
                step: 0
            }
        
        if(response === undefined)
            return {
                ...state,
                step: 0
            } 
       

        if(response.data === errors.INVALID_EMAIL)
            return {
                ...state,
                step: 0,
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
                step: 0,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.EMAIL_BUSY
                    }
                }
            }

        if(response.data === errors.ERROR_SEND_MESSAGE_TO_EMAIL)
            return {
                ...state,
                step: 0,
                validateState: {
                    ...state.validateState,
                    email: {
                        isError: true,
                        message: MESSAGE.FAILED_SEND_MESSAGE_TO_EMAIL
                    }
                }
            }

        return {
            ...state,
            step: 0
        } 

    }

    if(action.type === actionTypes.REGISTRATION_QUERY_SUCCESS){
        return {
            ...initialState,
            isSuccessWindowShow: true
        }
    }

    if(action.type === ACTION_FOR_REGISTRATION.ON_IMAGE_RECT_CHANGE_TO_REGISTRATION){
        return {
            ...state,
            image: {
                ...state.image,
                rect: action.payload
            }
        }   
    }

    return state;
    
}