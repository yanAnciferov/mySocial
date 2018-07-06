import { ACTION_FOR_SEARCH, ACTION_COMMON } from "../constans/ActionTypes";
import { updateFriendStateInList, checkTypeOnFriendStateChange } from "./reducerUtils";


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

    if(action.type === ACTION_COMMON.ON_ROUTE_LOCATION_CHANGE)
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

    if(checkTypeOnFriendStateChange(action.type))
    {
        let { result } = state;
        return {
            ...state,
            result: updateFriendStateInList(action.type, result, action.payload)
        };
    }

 
    return state;
    
}

