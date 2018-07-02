
import axios from "axios"
import * as API from "../constans/apiUrl"
import { getUserDataSuccess, getUserDataError } from "../scripts/actionHandlers/users";

export const getUserData = (id) => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  
  if(!isAuthorize)
    return;

  axios.get(API.GET_USER_DATA, { params: { id } })
  .then((res) => {
    getUserDataSuccess(dispatch, res.data);
  })
  .catch((err) => {
    getUserDataError(dispatch, err);
  })
} 

