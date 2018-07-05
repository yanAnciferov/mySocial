import { ACTION_FOR_APP, ACTION_FOR_PROFILE, ACTION_FROM_SERVER } from "../constans/ActionTypes"
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
        localStorage.setItem("userData", JSON.stringify(action.payload));
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
        let { friends, incoming, _id } = state.authorizedUser;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === _id })
        incoming.push(user);
        friends.splice(index ,1);
        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_OUTGOING)
    {
        let { friends, outgoing, _id } = state.authorizedUser;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === _id })
        outgoing.push(user);
        friends.splice(index ,1);
        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_NO_FRIEND)
    {
        let { friends, incoming, outgoing } = state.authorizedUser;
        let user = action.payload;
        let delegate = value => { return value._id === user._id };
        friends.splice(friends.findIndex(delegate) ,1);
        outgoing.splice(outgoing.findIndex(delegate) ,1);
        incoming.splice(incoming.findIndex(delegate) ,1);
        return {
            ...state
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_FRIEND)
    {
        let { friends, incoming, outgoing, _id } = state.authorizedUser;
        let user = action.payload;
        let delegate = value => { return value._id === _id };
        friends.push(user);
        outgoing.splice(outgoing.findIndex(delegate) ,1);
        incoming.splice(incoming.findIndex(delegate) ,1);
        return {
            ...state
        }
    }

    return state;
}