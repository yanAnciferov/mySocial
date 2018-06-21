//import * as types from '../constants/ActionTypes';

import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"
import { ACTION_FOR_REGISTRATION, ACTION_FOR_APP, ACTION_FOR_LOGIN } from "../constans/ActionTypes"

axios.defaults.baseURL = 'http://localhost:3001';


export const registration = () => (dispatch, getState) => {
   const {
    firstname,
    surname,
    parrentname,
    birthdate,
    email,
    sex,
    image: {
      file, rect
    },
    isValid
   } = getState().register;

   if(isValid == false)
    return;

   var params = new FormData();

   console.log(firstname)

   var { REGISTRATION_QUERY_ERROR, REGISTRATION_QUERY_START, REGISTRATION_QUERY_SUCCESS } = ACTION_FOR_REGISTRATION;

   params.append([MODEL_NAMES.FIRSTNAME], firstname);
   params.append([MODEL_NAMES.SURNAME], surname);
   params.append([MODEL_NAMES.PARRENTNAME], parrentname);
   params.append([MODEL_NAMES.EMAIL], email);
   params.append([MODEL_NAMES.SEX], sex);
   params.append([MODEL_NAMES.BIRTHDATE], birthdate);
   params.append("imageFile", file);
   params.append("imageRect", JSON.stringify(rect));

   console.log(params);

   dispatch({
     type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
     payload: "Идет регистрация"
   })

  axios.post('/api/account/registration',params)
      .then((res) => {
        dispatch({
          type: REGISTRATION_QUERY_SUCCESS
        })
        dispatch({
          type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
        })
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

   if(isValid == false)
    return;

    dispatch({
      type: ACTION_FOR_APP.SHOW_LOADING_WINDOW,
      payload: "Идет авторизация"
    })
 

    axios.post('/api/account/login',{email: email.trim(), password})
    .then((res) => {
        dispatch({
          type: ACTION_FOR_APP.HIDE_LOADING_WINDOW
        });
        console.log(res.data);
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

   if(isAuthorize == false)
    return;

    var Authorization = `Bearer ${token}`;
    console.log(Authorization)

    axios.post('/api/account/getAuthUserData', null ,{
      headers: {
        Authorization
      }
    })
    .then((res) => {
        console.log(res.data);
        dispatch({
          type: ACTION_FOR_APP.SET_USER_DATA,
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err);
    })
} 