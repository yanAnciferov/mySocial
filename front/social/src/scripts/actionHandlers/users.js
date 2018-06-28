import { ACTION_FOR_PROFILE } from "../../constans/ActionTypes";

var { CURRENT_USER_SUCCESS, CURRENT_USER_ERROR } = ACTION_FOR_PROFILE;

export function getUserDataSuccess (dispatch, data) {
    dispatch({
        type: CURRENT_USER_SUCCESS,
        payload: data
    })
}


export function getUserDataError(dispatch, err){
    console.dir(err);
    dispatch({
        type: CURRENT_USER_ERROR,
        err
    })
}