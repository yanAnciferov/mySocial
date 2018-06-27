//import * as types from '../constants/ActionTypes';

import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"
import { ACTION_FOR_REGISTRATION, ACTION_FOR_APP, ACTION_FOR_LOGIN, ACTION_FOR_EDIT, ACTION_FOR_PROFILE } from "../constans/ActionTypes"

import { push } from 'react-router-redux/actions';
import { COMMON_MESSAGE } from "../constans/common";
import { getUserModel } from "../scripts/userModel";
import registrationContent from "../content/registration"
import { PROFILE_CONTENT } from "../content/profile"
import * as API from "../constans/apiUrl"


export const registration = () => (dispatch, getState) => {
   let {
    firstname,
    surname,
    parrentname,
    birthdate,
    email,
    sex,
    isAvatarSkip,
    image: {
      file, rect
    },
    isValid
   } = getState().register;
   console.log(getState().register)
   if(!isValid)
    return;

   

   let { REGISTRATION_QUERY_ERROR, REGISTRATION_QUERY_SUCCESS } = ACTION_FOR_REGISTRATION;

   if(isAvatarSkip){
      file = null
      rect = null
   }

   let params = new FormData();
   params.append([MODEL_NAMES.FIRSTNAME], firstname);
   params.append([MODEL_NAMES.SURNAME], surname);
   params.append([MODEL_NAMES.PARRENTNAME], parrentname);
   params.append([MODEL_NAMES.EMAIL], email);
   params.append([MODEL_NAMES.SEX], sex);
   params.append([MODEL_NAMES.BIRTHDATE], birthdate);
   params.append("imageFile", file);
   params.append("imageRect", JSON.stringify(rect));

   dispatch({
     type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
     payload: registrationContent.RegistrationLoad
   })

  axios.post(API.REGISTRATION,params)
      .then((res) => {
        dispatch({
          type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
        });
        dispatch({
          type: ACTION_FOR_APP.LOGIN,
          payload: res.data
        });
        dispatch({
          type: ACTION_FOR_APP.SET_USER_DATA,
          payload: res.data.user
        });
        dispatch({
          type: REGISTRATION_QUERY_SUCCESS
        });
      })
      .catch((err) => {
        dispatch({
        type: REGISTRATION_QUERY_ERROR,
        err
      })
      dispatch({
        type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
      })
  })
}


export const login = () => (dispatch, getState) => {
  const {
    email,
    password,
    isValid
   } = getState().login;

   if(isValid === false)
    return;

    dispatch({
      type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
      payload: COMMON_MESSAGE.ON_AUTHORIZATION
    })
 

    axios.post(API.LOGIN,{email: email.trim(), password})
    .then((res) => {
        dispatch({
          type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
        });
        dispatch({
          type: ACTION_FOR_APP.LOGIN,
          payload: res.data
        });
        dispatch(getAuthUserData());
      })
      .catch((err) => {
        dispatch({
          type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
        })
        dispatch({
          type: ACTION_FOR_LOGIN.LOGIN_QUERY_ERROR,
          err
        })
    })
} 


export const getAuthUserData = () => (dispatch, getState) => {
  const {
    token,
    isAuthorize
   } = getState().app;

   if(!isAuthorize)
    return;
    
    axios.get(API.GET_AUTH_USER_DATA, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
        dispatch({
          type: ACTION_FOR_APP.SET_USER_DATA,
          payload: res.data.user
        })
        dispatch(push(`/${res.data.user._id}`))
      })
      .catch((err) => {
        console.log(err);
    })
} 





export const edit = () => (dispatch, getState) => {
  
  let { isValid, isChanged } = getState().edit;
  if(!isValid || !isChanged){
   return;
  }

  const { EDIT_QUERY_ERROR, EDIT_QUERY_SUCCESS } = ACTION_FOR_EDIT;
  let { token } = getState().app;

  dispatch({
    type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
    payload: PROFILE_CONTENT.UPDATE_DATA_LOAD
  })
  let Authorization = `Bearer ${token}`

  axios.post(API.EDIT, getUserModel(getState().edit),{
    headers: {
      Authorization
    }
  })
     .then((res) => {
       dispatch({
         type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
      });
      dispatch({
        type: ACTION_FOR_APP.SET_USER_DATA,
        payload: res.data.user
      });
      dispatch({
        type: EDIT_QUERY_SUCCESS,
        payload: res.data.user
      });
     })
     .catch((err) => {
       dispatch({
       type: EDIT_QUERY_ERROR,
       err
     })
     dispatch({
       type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
     })
 })
}




export const updateAvatar = () => (dispatch, getState) => {
  
  let { isValid, image, image: {file, rect } } = getState().avatar;
  let { authorizedUser: { email } } = getState().app;
  if(!isValid){
    return;
  }

  const { AVATAR_UPDATE_QUERY_ERROR, AVATAR_UPDATE_QUERY_SUCCESS } = ACTION_FOR_PROFILE;
  let { token } = getState().app;
  
  dispatch({
    type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
    payload: PROFILE_CONTENT.UPDATE_AVATAR_LOAD
  })
  let Authorization = `Bearer ${token}`
  console.log(image)
  let params = new FormData();
  params.append("email", email);
  params.append("imageFile", file);
  params.append("imageRect", JSON.stringify(rect));

  axios.post(API.UPDATE_AVATAR, params,{
    headers: {
      Authorization
    }
  })
     .then((res) => {
       dispatch({
         type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
      });
      dispatch({
        type: ACTION_FOR_APP.SET_USER_DATA,
        payload: res.data.user
      });
      dispatch({
        type: AVATAR_UPDATE_QUERY_SUCCESS
      });
     })
     .catch((err) => {
       dispatch({
       type: AVATAR_UPDATE_QUERY_ERROR,
       err
     })
     dispatch({
       type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
     })
 })
}
