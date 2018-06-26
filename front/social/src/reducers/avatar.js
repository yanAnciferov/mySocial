import {imageValidation,validate} from "../scripts/validate"

import { ACTION_FOR_REGISTRATION, ACTION_FOR_EDIT } from "../constans/ActionTypes"
import { errors } from "../constans/errors"

import { MODEL_NAMES, MESSAGE } from "../constans/registration"



const initialState = {

    image: {
        file: null,
        rect: null
    },

    isValid: false,
    isSuccessWindowShow: false, 
    validateState: {
        image: {
            isError: false,
            message: MESSAGE.ENTER_FILE
        }
    }
} 



export default function (state = initialState, action) {
    let actionTypes = ACTION_FOR_REGISTRATION;


    if(action.type === ACTION_FOR_EDIT.ON_IMAGE_LOAD_TO_EDIT){
        
        let imageValidationResult = imageValidation(action.payload, false);

        let newImage = {
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

    if(action.type === actionTypes.AVATAR_SUBMIT){

        let imageValide = imageValidation(state.image.file, true)
        let isValid;
        if(imageValide.isError)
            isValid = false        
        else isValid = true
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

    return state;
    
}