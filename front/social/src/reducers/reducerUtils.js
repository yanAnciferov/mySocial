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


export function deletePublication(list, id){
    
    let index = list.findIndex(value => { return value._id === id } );
    console.log(index);
    if(index !== -1)
    list.splice(index, 1);
    return list;
}


export function changeFriendsLists(action, userSubject) {
    if(action.type === ACTION_FROM_SERVER.TO_INCOMIG)
    {
        let { friends, incoming } = userSubject;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === user._id })
        incoming.push(user);
        if(index !== -1) {
            friends.splice(index ,1);
        }

        return {
            friends, 
            incoming
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_OUTGOING)
    {
        let { friends, outgoing } = userSubject;
        let user = action.payload;
        let index = friends.findIndex(value => { return value._id === user._id })

        if(index !== -1) {
            friends.splice(index ,1);
        }

        outgoing.push(user);
        return {
            friends,
            outgoing 
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_NO_FRIEND)
    {
        let { friends, incoming, outgoing } = userSubject;
        let user = action.payload;
        let delegate = value => { return value._id === user._id };
        let friendIndex = friends.findIndex(delegate);
        let outgoingIndex = outgoing.findIndex(delegate);
        let incomingIndex = incoming.findIndex(delegate);
        if(friendIndex !== -1) friends.splice(friendIndex ,1);
        if(outgoingIndex !== -1) outgoing.splice(outgoingIndex ,1);
        if(incomingIndex !== -1) incoming.splice(incomingIndex ,1);

        return {
            friends,
            incoming,
            outgoing
        }
    }

    if(action.type === ACTION_FROM_SERVER.TO_FRIEND)
    {
        let { friends, incoming, outgoing } = userSubject;
        let user = action.payload;
        let delegate = value => { return value._id === user._id };
        friends.push(user);
        let forOut = outgoing.findIndex(delegate);
        let forIn = incoming.findIndex(delegate)
        if(forOut !== -1) outgoing.splice(forOut ,1);
        if(forIn !== -1) incoming.splice(forIn ,1);

        return {
            friends,
            incoming,
            outgoing
        }
    }

    return null;
}