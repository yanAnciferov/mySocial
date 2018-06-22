import { ACTION_FOR_APP, ACTION_FOR_REGISTRATION, ACTION_FOR_PROFILE } from "../constans/ActionTypes"
import { COMMON_MESSAGE } from "../constans/common";
import { errors } from "../constans/errors";
import { MESSAGE } from "../constans/registration";


function getUserFromStorage(){
    var user = localStorage.getItem("userData");
    return (user === null) ? null : JSON.parse(user)
}


const initialState = {

    loadingWindow: {
        isVisible: false,
        message: ""
    },
    isAuthorize: localStorage.getItem("token") !== null,
    token: localStorage.getItem("token"),
    authorizedUser: getUserFromStorage()
}


export default function (state = initialState, action) {
   
    if(action.type === ACTION_FOR_APP.SHOW_LOADING_WINDOW)
        return {
            ...state,
            loadingWindow: {
                isVisible: true,
                message: action.payload
            }
        }

    if(action.type === ACTION_FOR_APP.HIDE_LOADING_WINDOW){
        return {
            ...state,
            loadingWindow: {
                isVisible: false,
                message: ""
            }
        }
    }

    if(action.type === ACTION_FOR_APP.LOGOUT){
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        return { 
            ...state,
            isAuthorize: false,
            token: null,
            authorizedUser: null
        }
    }
    
    if(action.type === ACTION_FOR_APP.LOGIN){
        var { token, user } = action.payload;
        localStorage.setItem("token", token);
        return { 
            ...state,
            isAuthorize: true,
            token
        }
    }


    if(action.type === ACTION_FOR_APP.SET_AUTHORIZE_USER_DATA){
        var { token, user } = action.payload;
        localStorage.setItem("token", token);
        return { 
            ...state,
            isAuthorize: true
        }
    }

    
    if(action.type === ACTION_FOR_APP.SET_USER_DATA){
        localStorage.setItem("userData", JSON.stringify(action.payload))
        
        return { 
            ...state,
            authorizedUser: action.payload
        }
    }

    if(action.type === ACTION_FOR_PROFILE.CURRENT_USER_ERROR)
    {

        if(action.err.response.data == errors.UNAUTHORIZED)
        {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            return { 
                ...state,
                isAuthorize: false,
                token: null,
                authorizedUser: null
            }
        }
        
    }
  

    return state;
}