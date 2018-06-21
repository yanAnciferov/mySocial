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

function getUnexpectedState(state){
    return {
        ...state,
        errorWindow: {
            isVisible: true,
            message: COMMON_MESSAGE.UNEXPECTED_ERROR_MESSAGE
        }
    }
}


function getTechnicalState(state){
    return {
        ...state,
        errorWindow: {
            isVisible: true,
            message: MESSAGE.TECHNICAL_WORK_ON_SERVER
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

        var {err} = action;
        var {response} = err;

        if(err.message == errors.NETWORK_ERROR || response.data == errors.DB_NOT_CONNECTED)
            return getTechnicalState(state);
        
        if(response === undefined)
            return getUnexpectedState(state);
       
    }

    if(action.type == ACTION_FOR_LOGIN.LOGIN_QUERY_ERROR)
    {
        var {err} = action;
        var {response} = err;
        console.dir(err.message == errors.NETWORK_ERROR);

        if(err.message == errors.NETWORK_ERROR)
            return getTechnicalState(state);

        if(response === undefined)
            return getUnexpectedState(state);
    }

    return state;
}