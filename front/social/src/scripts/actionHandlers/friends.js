import { ACTION_FOR_PROFILE, ACTION_FOR_APP } from "../../constans/ActionTypes";

var { CURRENT_USER_ERROR, SET_USER_FRIENDS } = ACTION_FOR_PROFILE;
var { SET_AUTH_USER_FRIENDS } = ACTION_FOR_APP;

export function getMyFriendsSuccess (dispatch, data) {
    dispatch({
        type: SET_AUTH_USER_FRIENDS,
        payload: data
    })
}


export function getMyFriendsError(dispatch, err){
    dispatch({
        type: CURRENT_USER_ERROR,
        err
    })
}

export function getFriendsSuccess (dispatch, data) {
    dispatch({
        type: SET_USER_FRIENDS,
        payload: data
    })
}


export function getFriendsError(dispatch, err){
    dispatch({
        type: CURRENT_USER_ERROR,
        err
    })
}