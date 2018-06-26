//import * as types from '../constants/ActionTypes';

import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"
import { ACTION_FOR_REGISTRATION, ACTION_FOR_APP, ACTION_FOR_LOGIN, ACTION_FOR_EDIT } from "../constans/ActionTypes"

import { push } from 'react-router-redux/actions';
import { COMMON_MESSAGE } from "../constans/common";
import { getUserModel } from "../scripts/userModel";




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

   var params = new FormData();

   var { REGISTRATION_QUERY_ERROR, REGISTRATION_QUERY_SUCCESS } = ACTION_FOR_REGISTRATION;

   if(isAvatarSkip){
      file = null
      rect = null
   }
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
     payload: "Идет регистрация"
   })

  axios.post('/api/account/registration',params)
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
 

    axios.post('/api/account/login',{email: email.trim(), password})
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
    
    axios.get('/api/account/getAuthUserData', {
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
    payload: "Обновляем ваши данные"
  })
  let Authorization = `Bearer ${token}`

  axios.post('/api/account/edit', getUserModel(getState().edit),{
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
