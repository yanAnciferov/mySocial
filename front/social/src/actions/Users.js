
import axios from "axios"
import { MODEL_NAMES } from "../constans/registration"
import { ACTION_FOR_REGISTRATION, ACTION_FOR_APP, ACTION_FOR_LOGIN, ACTION_FOR_PROFILE } from "../constans/ActionTypes"

import { push } from 'react-router-redux/actions';

export const getUserData = (id) => (dispatch, getState) => {
    console.log(id)
    const {
      token,
      isAuthorize
     } = getState().app;
  
     if(isAuthorize == false)
      return;
  
      var Authorization = `Bearer ${token}`;
     console.log("Получение данных стороннего пользователя")
      axios.post('/api/users/getUserData', {id} ,{
        headers: {
          Authorization
        }
      })
      .then((res) => {
          console.log(res.data);
          dispatch({
            type: ACTION_FOR_PROFILE.CURRENT_USER_SUCCESS,
            payload: res.data
          })
        })
        .catch((err) => {
            dispatch({
                type: ACTION_FOR_PROFILE.CURRENT_USER_ERROR,
                err
            })
      })
  } 