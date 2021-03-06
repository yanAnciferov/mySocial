import {  ACTION_FOR_APP, ACTION_FOR_FEED, ACTION_COMMON, ACTION_FOR_PROFILE } from "../constans/ActionTypes";
import { MENU_LINKS } from "../constans/common";
import { deletePublication } from "./reducerUtils";

const initialState = {
    publications: [],
    toUpdate: false
} 

export default function (state = initialState, action) {
   
    if(action.type === ACTION_FOR_FEED.ADD_PUBLICATIONS_TO_FEED){
        return {
            ...state,
            publications: state.publications.concat(action.payload),
            toUpdate: false
        }
    }

    if(action.type === ACTION_FOR_PROFILE.DELETE_PUBLICATION)
    {
        return {
            ...state,
            publications: deletePublication(state.publications, action.payload)
            
        }
         
    }

    if(action.type ===  ACTION_COMMON.ON_ROUTE_LOCATION_CHANGE && action.payload.pathname === MENU_LINKS.FEED){
        state.publications = [];
        state.toUpdate = true;
        return {
            ...state
        }
    }

    if(action.type ===  ACTION_FOR_APP.ON_ADD_PUBLICATION){
        state.publications.unshift(action.payload);
        return {
            ...state
        }
    }
 
    return state;
    
}