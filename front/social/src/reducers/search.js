import { ACTION_FOR_SEARCH, ACTION_FOR_APP } from "../constans/ActionTypes";
import { FRIEND_STATES } from "../constans/profile";
//import { URLSearchParams } from "url";


const initialState = {
    query: "",
    age: "",
    sex: "",
    searchUrl: "",
    result: []
} 



export default function (state = initialState, action) {
   
    if(action.type === ACTION_FOR_SEARCH.ON_SEARCH_SUCCESS){
        return {
            ...state,
            result: action.payload
        }
    }


    if(action.type === ACTION_FOR_SEARCH.ON_QUERY_CHANGE){
        return {
            ...state,
            query: action.payload
        }
    }

    if(action.type === "@@router/LOCATION_CHANGE")
    { 
        let params = new URLSearchParams(decodeURI(action.payload.search));
        let query; 
        if(!(query = params.get("query")))
            query = "";
        
        return {
            ...state,
            searchUrl: action.payload.search,
            query
        }
    }

    if(action.type === ACTION_FOR_APP.ON_INCOMING || action.type === ACTION_FOR_APP.ON_OUTGOING
        || action.type === ACTION_FOR_APP.ON_ACCEPT || action.type === ACTION_FOR_APP.ON_ACCEPTED)
    {
        return updateList(action.type, state, action.payload);
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