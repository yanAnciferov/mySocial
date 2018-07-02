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

    if(action.type === ACTION_FOR_APP.ON_INCOMING)
    {
        let { result } = state;
        let subscriber = action.payload;
        let index = result.findIndex((value) => value._id === subscriber._id);
        if(index != -1)
        {
            let updateResults = result;
            updateResults[index].friendState = FRIEND_STATES.FRIEND_INCOMING;
            return {
                ...state,
                result: updateResults
            }
        }
    }

    if(action.type === ACTION_FOR_APP.ON_OUTGOING)
    {
        let { result } = state;
        let subscriber = action.payload;
        let index = result.findIndex((value) => value._id === subscriber._id);
        if(index != -1)
        {
            let updateResults = result;
            updateResults[index].friendState = FRIEND_STATES.FRIEND_OUTGOING;
            return {
                ...state,
                result: updateResults
            }
        }
    }

    if(action.type === ACTION_FOR_APP.ON_ACCEPT || action.type === ACTION_FOR_APP.ON_ACCEPTED)
    {
        let { result } = state;
        let subscriber = action.payload;
        let index = result.findIndex((value) => value._id === subscriber._id);
        if(index != -1)
        {
            let updateResults = result;
            updateResults[index].friendState = FRIEND_STATES.FRIEND_YES
            return {
                ...state,
                result: updateResults
            }
        }
    }
 
    return state;
    
}