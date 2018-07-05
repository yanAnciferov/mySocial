import { ACTION_FOR_FEED } from "../../constans/ActionTypes";



export function onGetNewsSuccess(dispatch, data){
    dispatch({type: ACTION_FOR_FEED.ADD_PUBLICATIONS_TO_FEED, payload: data});

}

export function onGetNewsError(dispatch, err){
    console.log(err);
}