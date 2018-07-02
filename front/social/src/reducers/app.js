import { ACTION_FOR_APP, ACTION_FOR_PROFILE } from "../constans/ActionTypes"
import { errors } from "../constans/errors";
import { updateAxiosHeaderAuthorization } from "../axios";
import { connectToServer } from "../socket"

function getUserFromStorage(){
    updateAxiosHeaderAuthorization(localStorage.getItem("token"));
    let user = localStorage.getItem("userData");
    if(user === "undefined")
    {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        return null;
    }
    else{
        connectToServer(user);
    }
    return (user) ? JSON.parse(user) : null
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
    

    if(action.type === ACTION_FOR_APP.SET_AUTHORIZE_USER_DATA || action.type === ACTION_FOR_APP.LOGIN){
        let { token } = action.payload;
        localStorage.setItem("token", token);
        updateAxiosHeaderAuthorization(token);
        return { 
            ...state,
            isAuthorize: true,
            token
        }
    }

    
    if(action.type === ACTION_FOR_APP.SET_USER_DATA){
        localStorage.setItem("userData", JSON.stringify(action.payload))
        
        return { 
            ...state,
            authorizedUser: action.payload
        }
    }

    if(action.type === ACTION_FOR_PROFILE.CURRENT_USER_ERROR && action.err.response)
    {

        if(action.err.response.data === errors.UNAUTHORIZED)
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

    if(action.type === ACTION_FOR_APP.ON_INCOMING){
        let incoming = state.authorizedUser.incoming;
        incoming.push(action.payload);
        return {
            ...state,
            authorizedUser: {
                ...state.authorizedUser,
                incoming
            }
        }
    }

    if(action.type === ACTION_FOR_APP.ON_OUTGOING){
        let outgoing = state.authorizedUser.outgoing;
        outgoing.push(action.payload);
        return {
            ...state,
            authorizedUser: {
                ...state.authorizedUser,
                outgoing
            }
        }
    }


    if(action.type === ACTION_FOR_APP.ON_ACCEPT  || action.type === ACTION_FOR_APP.ON_ACCEPTED){
        let friends = state.authorizedUser.friends;
        let outgoing = state.authorizedUser.outgoing;
        let incoming = state.authorizedUser.incoming;

        let outIndex = outgoing.findIndex(value => { return value._id === action.payload._id } );
        if(outIndex != -1)
            outgoing.splice(outIndex, 1);

        let inIndex = incoming.findIndex(value => { return value._id === action.payload._id } );
        if(inIndex != -1)
            incoming.splice(outIndex, 1);

        friends.push(action.payload);
        return {
            ...state,
            authorizedUser: {
                ...state.authorizedUser,
                friends
            }
        }
    } 

    return state;
}