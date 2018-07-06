import axios from "axios"
import * as API from "../constans/apiUrl"
import { onGetNewsSuccess, onGetNewsError } from "../scripts/actionHandlers/feed";

export const getNews = (currentCount) => (dispatch, getState) => {
    const { isAuthorize } = getState().app;
    
    if(!isAuthorize)
      return;

    axios.get(API.GET_NEWS, { data: {currentCount} })
    .then((res) => {
        onGetNewsSuccess(dispatch,res.data);
    })
    .catch((err) => {
        onGetNewsError(dispatch, err);
    })
}