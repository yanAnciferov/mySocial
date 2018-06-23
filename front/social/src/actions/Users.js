
import axios from "axios"
import { ACTION_FOR_PROFILE } from "../constans/ActionTypes"


export const getUserData = (id) => (dispatch, getState) => {
    console.log(id)
    const {
      token,
      isAuthorize
     } = getState().app;
  
     if(isAuthorize === false)
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