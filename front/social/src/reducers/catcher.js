import { ACTION_FOR_APP, ACTION_FOR_REGISTRATION, ACTION_FOR_LOGIN } from "../constans/ActionTypes"
import { COMMON_MESSAGE } from "../constans/common";
import { errors } from "../constans/errors";
import { MESSAGE } from "../constans/registration";

const initialState = {
    errorWindow: {
        isVisible: false,
        message: ""
    }
}


function toVisibleErrorMessage(state, message){
    return {
        ...state,
        errorWindow: {
            isVisible: true,
            message: message
        }
    }
}


export default function (state = initialState, action) {

    if(action.type === ACTION_FOR_APP.CLOSE_ERROR_WINDOW){
        return {
            ...state,
            errorWindow: {
                isVisible: false,
                message: ""
            }
        }
    }

    if(action.type === ACTION_FOR_REGISTRATION.REGISTRATION_QUERY_ERROR){

        let {err, err: { response }} = action;

        if(err.message === errors.NETWORK_ERROR || !response || response.data === errors.DB_NOT_CONNECTED)
            return toVisibleErrorMessage(state,MESSAGE.TECHNICAL_WORK_ON_SERVER);
        
        if(response === undefined)
            return toVisibleErrorMessage(state,COMMON_MESSAGE.UNEXPECTED_ERROR_MESSAGE);
       
    }

    if(action.type === ACTION_FOR_LOGIN.LOGIN_QUERY_ERROR)
    {
        let {err, err: { response }} = action;

        if(err.message === errors.NETWORK_ERROR)
            return toVisibleErrorMessage(state,MESSAGE.TECHNICAL_WORK_ON_SERVER);

        if(response === undefined)
            return toVisibleErrorMessage(state,COMMON_MESSAGE.UNEXPECTED_ERROR_MESSAGE);
    }

    return state;
}