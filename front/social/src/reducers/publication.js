import { ACTION_FOR_SEARCH, ACTION_FOR_APP, ACTION_FOR_PUBLICATION } from "../constans/ActionTypes";
import { FRIEND_STATES } from "../constans/profile";
//import { URLSearchParams } from "url";


const initialState = {
    text: "",
    isValid: false
} 



export default function (state = initialState, action) {
   
    if(action.type === ACTION_FOR_PUBLICATION.ON_PUB_TEXT_CHANGE){
        return {
            ...state,
            text: action.payload
        }
    }


    if(action.type === ACTION_FOR_PUBLICATION.ON_PUB_SUBMIT){
        return {
            ...state,
            isValid: state.text > 1 && state.text < 2048
        }
    }

    if(action.type === "@@router/LOCATION_CHANGE" || action.type ===  ACTION_FOR_PUBLICATION.ON_PUBLICATION_SUCCESS)
    { 
        return initialState;
    }
 
    return state;
    
}


function updateList(type, state, user){
    let { result } = state;
    let index = result.findIndex((value) => value._id === user._id);
    let newFriendState;
    if(index === -1)
        return state;
    
    switch (type) {
        case ACTION_FOR_APP.ON_INCOMING:
            newFriendState = FRIEND_STATES.FRIEND_INCOMING;
            break;
        case ACTION_FOR_APP.ON_OUTGOING:
            newFriendState = FRIEND_STATES.FRIEND_OUTGOING;
            break;
        case ACTION_FOR_APP.ON_ACCEPT:
        case ACTION_FOR_APP.ON_ACCEPTED:
            newFriendState = FRIEND_STATES.FRIEND_YES;
            break;    
        
        default:
            break;
    }
    let updateResults = result;
    updateResults[index].friendState = newFriendState;
    return {
        ...state,
        result: updateResults
    }
    
    
}