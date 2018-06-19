import { ACTION_FOR_APP, ACTION_FOR_REGISTRATION } from "../constans/ActionTypes"
import { COMMON_MESSAGE } from "../constans/common";
import { errors } from "../constans/errors";
import { MESSAGE } from "../constans/registration";

const initialState = {

    loadingWindow: {
        isVisible: false,
        message: ""
    }
}


export default function (state = initialState, action) {

    if(action.type === ACTION_FOR_APP.SHOW_LOADING_WINDOW)
        return {
            ...state,
            loadingWindow: {
                isVisible: true,
                message: action.payload
            }
        }

    if(action.type === ACTION_FOR_APP.HIDE_LOADING_WINDOW){
        return {
            ...state,
            loadingWindow: {
                isVisible: false,
                message: ""
            }
        }
    }

    return state;
}