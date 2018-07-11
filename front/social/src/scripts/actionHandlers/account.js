import { getAuthUserData } from "../../actions/Account";
import { ACTION_FOR_APP, ACTION_FOR_LOGIN, ACTION_FOR_REGISTRATION, ACTION_FOR_EDIT, ACTION_FOR_PROFILE, ACTION_FOR_PUBLICATION, ACTION_FOR_PASSWORD } from "../../constans/ActionTypes";
import { push } from "react-router-redux/actions";
import { HideLoadingWindow } from "./common";

var { LOGIN, SET_USER_DATA } = ACTION_FOR_APP;
var { REGISTRATION_QUERY_SUCCESS, REGISTRATION_QUERY_ERROR } = ACTION_FOR_REGISTRATION;
var { LOGIN_QUERY_ERROR } = ACTION_FOR_LOGIN;
var { EDIT_QUERY_SUCCESS, EDIT_QUERY_ERROR } = ACTION_FOR_EDIT;
var { AVATAR_UPDATE_QUERY_ERROR, AVATAR_UPDATE_QUERY_SUCCESS } = ACTION_FOR_PROFILE


export function registrationSuccess(dispatch,data){
    HideLoadingWindow(dispatch);
    dispatch({
        type: LOGIN,
        payload: data
    });
    dispatch({
        type: SET_USER_DATA,
        payload: data.user
    });
    dispatch({
        type: REGISTRATION_QUERY_SUCCESS
    });
    dispatch(push(`/${data.user._id}`))
}



export function registrationError(dispatch,err){
    dispatch({
        type: REGISTRATION_QUERY_ERROR,
        err
    })
    HideLoadingWindow(dispatch);
}


export function loginSuccess(dispatch,data){
    HideLoadingWindow(dispatch);
    dispatch({
        type: LOGIN,
        payload: data
    });
    dispatch(getAuthUserData(true));
}


export function loginError(dispatch,err){
    HideLoadingWindow(dispatch);
    dispatch({
        type: LOGIN_QUERY_ERROR,
        err
    })
}


export function getAuthUserDataSuccess(dispatch,data, redirect){
    dispatch({
        type: ACTION_FOR_APP.SET_USER_DATA,
        payload: data.user
    })
    
    if(redirect)
    {
        dispatch(push(`/${data.user._id}`));
    }
}


export function getAuthUserDataError(dispatch,err){
  console.log(err);
}


export function editSuccess(dispatch,data){
    HideLoadingWindow(dispatch);
    dispatch({
       type: ACTION_FOR_APP.SET_USER_DATA,
       payload: data.user
    });
    dispatch({
       type: EDIT_QUERY_SUCCESS,
       payload: data.user
    });
}

export function editError(dispatch,err){
    dispatch({
        type: EDIT_QUERY_ERROR,
        err
    })
    HideLoadingWindow(dispatch);
}

export function updateAvatarSuccess(dispatch,data){
    HideLoadingWindow(dispatch);
     dispatch({
       type: ACTION_FOR_APP.SET_USER_DATA,
       payload: data.user
     });
     dispatch({
       type: AVATAR_UPDATE_QUERY_SUCCESS
     });
}


export function updateAvatarError(dispatch,err){
    dispatch({
        type: AVATAR_UPDATE_QUERY_ERROR,
        err
    })
    HideLoadingWindow(dispatch);
}



export function sendPublicationSuccess(dispatch,data){
    dispatch({
       type: ACTION_FOR_PUBLICATION.ON_PUBLICATION_SUCCESS
    });
}


export function sendPublicationError(dispatch,err){
    console.log(err);
}


export function changePasswordSuccess(dispatch){
    dispatch({type: ACTION_FOR_PASSWORD.PASSWORD_SUCCESS});
}

export function changePasswordError(dispatch,err){
    dispatch({type: ACTION_FOR_PASSWORD.PASSWORD_ON_ERROR, err});
}


export function changeLanguageSuccess(dispatch){
    dispatch({type: ACTION_FOR_APP.LANGUAGE_SUCCESS});
}

export function changeLanguageError(dispatch,err){
   console.log(err);
}


export function deletePublicationSuccess(dispatch, data){
    dispatch({type: ACTION_FOR_PROFILE.DELETE_PUBLICATION, payload: data});
}

export function deletePublicationError(dispatch, err){
    console.log(err);
}