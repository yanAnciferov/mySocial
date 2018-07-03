import { ACTION_FOR_SEARCH } from "../../constans/ActionTypes";



export function onSearchSuccess(dispatch, data){
    dispatch({type: ACTION_FOR_SEARCH.ON_SEARCH_SUCCESS, payload: data});
}



export function onSearchError(dispatch, err){
    console.log(err)
}