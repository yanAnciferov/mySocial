import { FRIEND_STATES } from "../constans/profile";
import { ACTION_FROM_SERVER } from "../constans/ActionTypes";



export function updateFriendStateInList(type, list, user){
    let index = list.findIndex((value) => value._id === user._id);
    
    if(index === -1)
        return list;

    list[index] = updateFriendStateForUser(type, list[index]);
    return list;    
}



export function updateFriendStateForUser(type, user){
    if(!user) return user;

    let newFriendState = user.friendState;
    switch (type) {
        case ACTION_FROM_SERVER.TO_INCOMIG:
            newFriendState = FRIEND_STATES.FRIEND_INCOMING;
            break;
        case ACTION_FROM_SERVER.TO_OUTGOING:
            newFriendState = FRIEND_STATES.FRIEND_OUTGOING;
            break;
        case ACTION_FROM_SERVER.TO_FRIEND:
            newFriendState = FRIEND_STATES.FRIEND_YES;
            break;    
        case ACTION_FROM_SERVER.TO_NO_FRIEND:
            newFriendState = FRIEND_STATES.FRIEND_NO;
            break;    
        
        default:
            break;
    }

    user = {
        ...user,
        friendState: newFriendState
    }
    return user;    
}


export function checkTypeOnFriendStateChange(type){
    
    return type === ACTION_FROM_SERVER.TO_FRIEND || type === ACTION_FROM_SERVER.TO_INCOMIG
    || type === ACTION_FROM_SERVER.TO_NO_FRIEND || type === ACTION_FROM_SERVER.TO_OUTGOING
}
