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
    authorizedUser: getUserFromStorage(),
    wallPublications: []
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
        let { friends, outgoing, incoming } = state.authorizedUser;

        let delegate = value => { return value._id === action.payload._id };

        let outIndex = outgoing.findIndex(delegate);
        let inIndex = incoming.findIndex(delegate);

        if(outIndex !== -1) outgoing.splice(outIndex, 1);
        if(inIndex !== -1) incoming.splice(inIndex, 1);

        friends.push(action.payload);
        return {
            ...state,
            authorizedUser: {
                ...state.authorizedUser,
                friends,
                outgoing,
                incoming
            }
        }
    }
    
    if(action.type === ACTION_FOR_APP.SET_AUTH_USER_FRIENDS){
        return {
            ...state,
            authorizedUser: {
                ...state.authorizedUser,
                friends: action.payload.friends,
                incoming: action.payload.incoming,
                outgoing: action.payload.outgoing
            }
        }
    }

    if(action.type === ACTION_FOR_APP.ADD_PUBLICATION_TO_WALL){
        let { authorizedUser } = state;
        if(authorizedUser && authorizedUser._id === action.payload.user._id){
            authorizedUser.publications.push(action.payload);
            return {
                ...state
            }
        }
        
    }

    return state;
}