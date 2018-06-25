
import axios from "axios"
import { ACTION_FOR_PROFILE } from "../constans/ActionTypes"


export const getUserData = (id) => (dispatch, getState) => {
    const {
      token,
      isAuthorize
     } = getState().app;
  
     if(!isAuthorize)
      return;

      const Authorization = `Bearer ${token}`;
      axios.get('/api/users/getUserData',{
        headers: {
          Authorization
        }, 
        params: {
          id
        }
      })
      .then((res) => {
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