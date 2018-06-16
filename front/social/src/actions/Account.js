//import * as types from '../constants/ActionTypes';

import axios from "axios"
import * as consts from "../constans/registration"

axios.defaults.baseURL = 'http://127.0.0.1:3001';


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

   params.append([consts.MODEL_FIRSTNAME], firstname);
   params.append([consts.MODEL_SURNAME], surname);
   params.append([consts.MODEL_PARRENTNAME], parrentname);
   params.append([consts.MODEL_EMAIL], email);
   params.append([consts.MODEL_SEX], sex);
   params.append([consts.MODEL_BIRTHDATE], birthdate);
   params.append("imageFile", file);
   params.append("imageRect", JSON.stringify(rect));

   console.log(params);


  axios.post('/registration',params)
       .then((res) => {
         console.log(res);
       })
       .catch((err) => {
         console.log(err);
       })


}