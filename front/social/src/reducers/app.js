import { ACTION_FOR_APP, ACTION_FOR_PROFILE, ACTION_FROM_SERVER, ACTION_COMMON } from "../constans/ActionTypes"
import { errors } from "../constans/errors";
import { updateAxiosHeaderAuthorization } from "../axios";
import { connectToServer } from "../socket"

function getUserFromStorage(){
    updateAxiosHeaderAuthorization(localStorage.getItem("token"));
    let user = localStorage.getItem("userData");
    if(!user)
    {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        return null;
    }
    else{
        let res = JSON.parse(user);
        connectToServer(res._id);
        return res;
    }
}

function getInitialState(){
    let user = getUserFromStorage();
    return {
        loadingWindow: {
            isVisible: false,
            message: ""
        },
        isAuthorize: localStorage.getItem("token") !== null,
        token: localStorage.getItem("token"),
        authorizedUser: user ,
        wallPublications: [],
        currentLanguage: user && user.language ? user.language : "en"
    }
}


export default function (state = getInitialState(), action) {
    

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

    if(action.type === ACTION_COMMON.ON_ROUTE_LOCATION_CHANGE){
        return {
            ...state
        }
    }

    if(action.type === ACTION_FOR_APP.LANGUAGE_CHANGE){
        return {
            ...state,
            currentLanguage: action.payload
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
        let user = action.payload;
        localStorage.setItem("userData", JSON.stringify(user));
        return { 
            ...state,
            authorizedUser: user,
            currentLanguage: user.language
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

    if(action.type === ACTION_FOR_APP.ON_ADD_PUBLICATION){
        let { authorizedUser } = state;
        if(authorizedUser && authorizedUser._id === action.payload.user._id){
            authorizedUser.publications.unshift(action.payload);
            return {
                ...state
            }
        }
        
    }

    if(action.type === ACTION_FROM_SERVER.TO_INCOMIG)
    {
        let { friends, incoming } = state.authorizedUser;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === user._id })
        incoming.push(user);
        if(index !== -1) {
            friends.splice(index ,1);
        }

        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_OUTGOING)
    {
        let { friends, outgoing } = state.authorizedUser;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === user._id })

        if(index !== -1) {
            friends.splice(index ,1);
        }

        outgoing.push(user);
        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_NO_FRIEND)
    {
        let { friends, incoming, outgoing } = state.authorizedUser;
        let user = action.payload;
        let delegate = value => { return value._id === user._id };
        let friendIndex = friends.findIndex(delegate);
        let outgoingIndex = outgoing.findIndex(delegate);
        let incomingIndex = incoming.findIndex(delegate);
        if(friendIndex !== -1) friends.splice(friendIndex ,1);
        if(outgoingIndex !== -1) outgoing.splice(outgoingIndex ,1);
        if(incomingIndex !== -1) incoming.splice(incomingIndex ,1);

        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_FRIEND)
    {
        let { friends, incoming, outgoing } = state.authorizedUser;
        let user = action.payload;
        let delegate = value => { return value._id === user._id };
        friends.push(user);
        let forOut = outgoing.findIndex(delegate);
        let forIn = incoming.findIndex(delegate)
        if(forOut !== -1) outgoing.splice(forOut ,1);
        if(forIn !== -1) incoming.splice(forIn ,1);
        return {
            ...state
        }
    }

    return state;
}