import { ACTION_FOR_APP,  ACTION_FOR_PROFILE } from "../constans/ActionTypes"
import { errors } from "../constans/errors";


const initialState = {
    userData: null,
    friends: [],
    incoming: [],
    isNotFound: false,
    currentPageId: "",
    isShowAvatarPicker: false
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
        if(!action.err.response || action.err.response.data === errors.NOT_FOUND)
        {
            return { 
                ...state,
                userData: null,
                isNotFound: true
            }
        }        
    }

    if(action.type === ACTION_FOR_PROFILE.SET_USER_FRIENDS)
    {
        return{
            ...state,
            friends: action.payload.friends,
            incoming: action.payload.incoming
        } 
    }

    if(action.type === ACTION_FOR_PROFILE.LOAD_AVATAR_OPEN)
    {
        return { 
            ...state,
            isShowAvatarPicker: true
        }                
    }

    if(action.type === ACTION_FOR_PROFILE.LOAD_AVATAR_CLOSE || action.type === ACTION_FOR_PROFILE.AVATAR_UPDATE_QUERY_SUCCESS)
    {
        return { 
            ...state,
            isShowAvatarPicker: false
        }   
    }

        

    return state;
}