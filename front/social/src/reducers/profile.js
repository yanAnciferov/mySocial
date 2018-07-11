import { ACTION_FOR_APP,  ACTION_FOR_PROFILE, ACTION_FROM_SERVER } from "../constans/ActionTypes"
import { errors } from "../constans/errors";
import { updateFriendStateForUser, checkTypeOnFriendStateChange, deletePublication } from "./reducerUtils";

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



    if(action.type === ACTION_FOR_PROFILE.DELETE_PUBLICATION)
    {
        return {
            ...state,
            userData: {
                ...state.userData,
                publications: deletePublication(state.userData.publications, action.payload)
            }
        }
         
    }

    // if(action.type === ACTION_FROM_SERVER.TO_INCOMIG)
    // {
    //     let user = action.payload;
    //     if(user._id === state.userData._id)
    //     {
    //         let index = state.userData.friends.findIndex(value => { return value._id === action.idSender })
    //         if(index != -1)
    //             state.userData.friends.splice(index, 1);
    //     }
    //     return{
    //         ...state,
    //         userData: {
    //             ...state.userData,
    //             friends: state.userData.friends
    //         }
    //     }
    // }
    
    if(checkTypeOnFriendStateChange(action.type))
    {
        let user = action.payload;
        let newState = null;
        if(state.userData && user._id === state.userData._id){
            newState = {
                ...state,
                userData: updateFriendStateForUser(action.type, state.userData)
            };
        }else return state;
        console.log(action.type)
        if(action.type === ACTION_FROM_SERVER.TO_INCOMIG)
        {
            let { friends } = newState.userData;
            let index = friends.findIndex(value => { return value._id === action.sender._id })
    
            if(index !== -1)
                friends.splice(index, 1);
            
            return{
                ...newState,
                userData: {
                    ...newState.userData,
                    friends
                }
            }
        }


        if(action.type === ACTION_FROM_SERVER.TO_FRIEND)
        {
            newState.userData.friends.push(action.sender);            
            return{
                ...newState,
                userData: {
                    ...newState.userData,
                    friends: newState.userData.friends
                }
            }
        }

        return newState;
    }

    return state;
}