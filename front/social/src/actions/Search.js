import axios from "axios"
import * as API from "../constans/apiUrl"
import { onSearchSuccess, onSearchError } from "../scripts/actionHandlers/search";

export const search = () => (dispatch, getState) => {
    const { isAuthorize } = getState().app;
    
    if(!isAuthorize)
      return;

    const { searchUrl } = getState().search;
    axios.get(`${API.SEARCH}${searchUrl}`)
    .then((res) => {
      onSearchSuccess(dispatch,res.data);
    })
    .catch((err) => {
      onSearchError(dispatch, err);
    })
}