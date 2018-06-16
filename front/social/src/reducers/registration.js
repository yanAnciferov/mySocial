import {HANDLE_CHANGE, SEX_CHANGE} from "../constans/ActionTypes"
import {nameValidate, dateValidate, emailValidate, sexValidate , imageValidation} from "../components/pages/registration/validate"

import * as actionTypes from "../constans/ActionTypes"

import * as consts from "../constans/registration"

const initialState = {

    [consts.MODEL_FIRSTNAME]: "zz",
    [consts.MODEL_SURNAME]: "zz",
    [consts.MODEL_PARRENTNAME]: "zz",
    [consts.MODEL_EMAIL]: "zzz@zzz",
    [consts.MODEL_BIRTHDATE]: "11-11-2011",
    [consts.MODEL_SEX]: "male",

    image: {
        file: null,
        rect: null
    },

    step: 0,
    isLoading: false,
    isValid: false,
    
    validateState: {
        [consts.MODEL_FIRSTNAME]: {
            isError: false,
            message: consts.ENTER_NAME
        },
        [consts.MODEL_SURNAME]: {
            isError: false,
            message: consts.ENTER_SURNAME
        },
        [consts.MODEL_PARRENTNAME]: {
            isError: false,
            message: consts.ENTER_PARRENTNAME
        },
        [consts.MODEL_EMAIL]: {
            isError: false,
            message: consts.ENTER_EMAIL
        },
        [consts.MODEL_BIRTHDATE]: {
            isError: false,
            message: consts.ENTER_BIRTHDATE
        },
        [consts.MODEL_SEX]: {
            isError: false,
            message: consts.ENTER_SEX
        },
        image: {
            isError: false,
            message: consts.ENTER_FILE
        }
    }
} 



export default function (state = initialState, action) {
    
    if(action.type === actionTypes.ON_SUBMIT){

        var newValidateState = {
            ...state.validateState,
            [consts.MODEL_FIRSTNAME]: nameValidate(state.firstname,true, consts.MODEL_FIRSTNAME),
            [consts.MODEL_SURNAME]: nameValidate(state.surname,true, consts.MODEL_SURNAME),
            [consts.MODEL_PARRENTNAME]: nameValidate(state.parrentname,false, consts.MODEL_PARRENTNAME),
            [consts.MODEL_EMAIL]: emailValidate(state.email),
            [consts.MODEL_BIRTHDATE]: dateValidate(state.birthdate),
            [consts.MODEL_SEX]: sexValidate(state.sex)
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

    return state;
    
}