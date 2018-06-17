//import * as types from '../constants/ActionTypes';

import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"
import { REGISTRATION_QUERY_ERROR, REGISTRATION_QUERY_START, REGISTRATION_QUERY_SUCCESS } from "../constans/ActionTypes"

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
     type: REGISTRATION_QUERY_START
   })

  axios.post('/api/account/registration',params)
      .then((res) => {
        console.log(res);
        dispatch({
        type: REGISTRATION_QUERY_SUCCESS
      })
      })
      .catch((err) => {
        dispatch({
        type: REGISTRATION_QUERY_ERROR,
        err
      })
  })
}