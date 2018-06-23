import { ACTION_FOR_APP,  ACTION_FOR_PROFILE } from "../constans/ActionTypes"
import { errors } from "../constans/errors";


const initialState = {
    userData: null,
    isNotFound: false,
    currentPageId: ""
}


export default function (state = initialState, action) {
    if(action.type === ACTION_FOR_PROFILE.CURRENT_USER_SUCCESS)
        return {
            ...state,
            userData: action.payload,
            isNotFound: false
        }



    if(action.type === ACTION_FOR_APP.SET_USER_DATA){        
        return { 
            ...state,
            userData: action.payload,
            isNotFound: false
        }
    }

    if(action.type === ACTION_FOR_PROFILE.CURRENT_USER_ERROR)
    {
        if(action.err.response.data === errors.NOT_FOUND)
        {
            return { 
                ...state,
                userData: null,
                isNotFound: true
            }
        }        
    }
        

    return state;
}