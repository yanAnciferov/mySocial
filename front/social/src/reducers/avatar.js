import {imageValidation} from "../scripts/validate"

import { ACTION_FOR_EDIT, ACTION_FOR_PROFILE } from "../constans/ActionTypes"

import { MESSAGE } from "../constans/registration"



const initialState = {

    image: {
        file: null,
        rect: { x: 0, y: 0, width: 1, height: 1 }
    },
    isValid: false,
    validateState: {
        image: {
            isError: false,
            message: MESSAGE.ENTER_FILE
        }
    }
} 



export default function (state = initialState, action) {
    
    if(action.type === ACTION_FOR_EDIT.ON_IMAGE_LOAD_TO_EDIT){
        
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

    if(action.type === ACTION_FOR_EDIT.ON_IMAGE_SUBMIT){

        let imageValide = imageValidation(state.image.file, true)
        let isValid;
        if(imageValide.isError)
            isValid = false        
        else isValid = true
        return {
            ...state,
            isValid,
            validateState: {
                image: imageValide
            }
        }        
    }


    if(action.type === ACTION_FOR_EDIT.ON_IMAGE_RECT_CHANGE_TO_EDIT){
        return {
            ...state,
            image: {
                ...state.image,
                rect: action.payload
            }
        }   
    }

    if(action.type === ACTION_FOR_PROFILE.LOAD_AVATAR_CLOSE || action.type === ACTION_FOR_PROFILE.AVATAR_UPDATE_QUERY_SUCCESS)
    {
        return initialState;
    }

    return state;
    
}