import { ACTION_FOR_APP } from "../../constans/ActionTypes";

var { SHOW_LOADING_WINDOW, HIDE_LOADING_WINDOW } = ACTION_FOR_APP;

export function ShowLoadingWindow(dispatch, message){
    dispatch({
        type: SHOW_LOADING_WINDOW,
        payload: message 
      })
}


export function HideLoadingWindow(dispatch, message){
    dispatch({
        type: HIDE_LOADING_WINDOW
      })
}