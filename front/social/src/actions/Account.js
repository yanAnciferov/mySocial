import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"

import { COMMON_MESSAGE } from "../constans/common";
import { getUserModel } from "../scripts/userModel";
import registrationContent from "../content/registration"
import { PROFILE_CONTENT } from "../content/profile"
import * as API from "../constans/apiUrl"
import { registrationSuccess, loginSuccess, loginError, getAuthUserDataError,
   editSuccess, editError, updateAvatarSuccess, updateAvatarError, registrationError,
    getAuthUserDataSuccess, sendPublicationSuccess, changePasswordSuccess, changePasswordError,
      changeLanguageSuccess, changeLanguageError, sendPublicationError, deletePublicationSuccess, deletePublicationError} from "../scripts/actionHandlers/account";
import { ShowLoadingWindow } from "../scripts/actionHandlers/common";
import { getMyFriendsSuccess, getMyFriendsError } from "../scripts/actionHandlers/friends";


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
   
   if(!isValid)
    return;

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

   ShowLoadingWindow(dispatch, registrationContent.RegistrationLoad);

  axios.post(API.REGISTRATION,params)
    .then((res) => {
      registrationSuccess(dispatch,res.data);
    })
    .catch((err) => {
      registrationError(dispatch,err);
    })
}


export const login = () => (dispatch, getState) => {
  const { email, password, isValid } = getState().login;

  if(isValid === false)
    return;

  ShowLoadingWindow(dispatch, COMMON_MESSAGE.ON_AUTHORIZATION);

  axios.post(API.LOGIN,{email: email.trim(), password})
  .then((res) => {
      loginSuccess(dispatch,res.data);
  })
  .catch((err) => {
      loginError(dispatch,err);
  })
} 


export const getAuthUserData = (redirect) => (dispatch, getState) => {
  const { isAuthorize } = getState().app;

  if(!isAuthorize)
    return;
    
  axios.get(API.GET_AUTH_USER_DATA)
  .then((res) => {
    getAuthUserDataSuccess(dispatch,res.data, redirect)
  })
  .catch((err) => {
    getAuthUserDataError(dispatch,err);
  })
} 





export const edit = () => (dispatch, getState) => {
  
  let { isValid, isChanged } = getState().edit;
  if(!isValid || !isChanged){
   return;
  }

  ShowLoadingWindow(dispatch, PROFILE_CONTENT.UPDATE_DATA_LOAD);

  axios.post(API.EDIT, getUserModel(getState().edit))
     .then((res) => {
      editSuccess(dispatch,res.data);
     })
     .catch((err) => {
      editError(dispatch,err);
  })
}




export const updateAvatar = () => (dispatch, getState) => {
  
  let { isValid, image: {file, rect } } = getState().avatar;
  let { authorizedUser: { email } } = getState().app;

  if(!isValid){
    return;
  }

  ShowLoadingWindow(dispatch, PROFILE_CONTENT.UPDATE_AVATAR_LOAD)

  let params = new FormData();
  params.append("email", email);
  params.append("imageFile", file);
  params.append("imageRect", JSON.stringify(rect));

  axios.post(API.UPDATE_AVATAR, params)
  .then((res) => {
    updateAvatarSuccess(dispatch,res.data);
  })
  .catch((err) => {
    updateAvatarError(dispatch,err)
  })
}


export const getAuthUserFriendList = (id) => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  axios.get(API.GET_USER_FRIEND_LIST, { params: { id } })
  .then((res) => {
    getMyFriendsSuccess(dispatch, res.data);
  })
  .catch((err) => {
    getMyFriendsError(dispatch, err);
  })
} 


export const sendNewPublication = () => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  const { text, isValid } = getState().publication;
  if(!isValid)
    return;
    
  let params = new FormData();
  params.append("imageFile", null);
  params.append("textBody", text);
  axios.post(API.NEW_PUBLICATION, params)
  .then((res) => {
    sendPublicationSuccess(dispatch, res.data);
  })
  .catch((err) => {
    sendPublicationError(dispatch, err);
  })
}


export const deletePublication = (id) => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  
  axios.post(API.DELETE_PUBLICATION, { id })
  .then((res) => {
    deletePublicationSuccess(dispatch, id);
  })
  .catch((err) => {
    deletePublicationError(dispatch, err);
  })
}


export const changePassword = () => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  const { newPassword, oldPassword, confirmPassword, isValid } = getState().password;
  if(!isValid)
    return;

  axios.post(API.CHANGE_PASSWORD, {
    newPassword, oldPassword, confirmPassword
  })
  .then((res) => {
    changePasswordSuccess(dispatch);
  })
  .catch((err) => {
    changePasswordError(dispatch, err);
  })
}

export const changeLanguage = () => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  const { currentLanguage } = getState().app;

  axios.post(API.CHANGE_LANGUAGE, {
    language: currentLanguage
  })
  .then((res) => {
    changeLanguageSuccess(dispatch);
  })
  .catch((err) => {
    changeLanguageError(dispatch, err);
  })
}

