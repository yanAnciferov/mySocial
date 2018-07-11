import { ACTION_FOR_PUBLICATION } from "../constans/ActionTypes";
import { TEXT_PARAMS } from "../constans/common";

const initialState = {
    text: "",
    isValid: false
} 

export default function (state = initialState, action) {
   
    if(action.type === ACTION_FOR_PUBLICATION.ON_PUB_TEXT_CHANGE){
        return {
            ...state,
            text: action.payload
        }
    }


    if(action.type === ACTION_FOR_PUBLICATION.ON_PUB_SUBMIT){
        state.text = state.text.trim();
        return {
            ...state,
            isValid: state.text > TEXT_PARAMS.MIN_TEXT_SIZE && state.text < TEXT_PARAMS.MAX_TEXT_SIZE
        }
    }

    if(action.type ===  ACTION_FOR_PUBLICATION.ON_PUBLICATION_SUCCESS)
    { 
        return initialState;
    }
 
    return state;
    
}
