import { ACTION_FOR_MESSAGEBOX } from "../constans/ActionTypes";


const initialState = {
    
    isVisible: false,
    message: "",
    okDelegate: () => {},
    cancelDelegate: () => {}
}


export default function (state = initialState, action) {

    if(action.type === ACTION_FOR_MESSAGEBOX.MESSAGEBOX_CALL){
        return {
            isVisible: true,
            ...action.payload
        }
    }

    if(action.type === ACTION_FOR_MESSAGEBOX.MESSAGEBOX_CLOSE){
        return initialState;
    }

    return state;
}