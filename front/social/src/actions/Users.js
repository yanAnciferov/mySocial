
import axios from "axios"
import * as API from "../constans/apiUrl"
import { getUserDataSuccess, getUserDataError } from "../scripts/actionHandlers/users";
import { getFriendsSuccess, getFriendsError } from "../scripts/actionHandlers/friends";

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

export const getUserFriendList = (id) => (dispatch, getState) => {
  const { isAuthorize } = getState().app;
  if(!isAuthorize)
    return;

  axios.get(API.GET_USER_FRIEND_LIST, { params: { id } })
  .then((res) => {
    getFriendsSuccess(dispatch, res.data);
  })
  .catch((err) => {
    getFriendsError(dispatch, err);
  })
} 
