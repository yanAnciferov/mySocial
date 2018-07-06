var { updateUserAvatarPaths }  = require("../scripts/utils");

var { FRIEND_STATES } = require("../constants/common");

var { User } = require("./User");



function getFriendState(user, authorizeUser){

    let uId = user._id.toString();
    let delegate = value => { return value.toString() === uId; };

    if(authorizeUser.friends.findIndex(delegate) != -1)
        return FRIEND_STATES.FRIEND_YES
        
    if (authorizeUser.outgoing.findIndex(delegate) != -1)
        return FRIEND_STATES.FRIEND_OUTGOING
    else if (authorizeUser.incoming.findIndex(delegate) != -1)
        return FRIEND_STATES.FRIEND_INCOMING

    return FRIEND_STATES.FRIEND_NO;
    
}


function itsMe(user, authorizeUser){
    return user._id.toString() === authorizeUser._id.toString();
}


function changeUserForSearchRes(user, authorizeUser){
    return {
        ...updateUserAvatarPaths(user),
        itsMy: itsMe(user, authorizeUser),
        friendState: getFriendState(user, authorizeUser)
    }
}

function changeUserForMessage(user){
    let res = updateUserAvatarPaths(user);
    return {
        avatar: res.avatar,
        minAvatar: res.minAvatar,
        firstname: res.firstname,
        surname: res.surname,
        parrentname: res.parrentname,
        _id: res._id
    }
}


function changeUserForClient(user){
    return{
        ...updateUserAvatarPaths(user),
        friends: [],
        outgoing: [],
        incoming: []
    }
}

function updateUserArrayForSend(users, authorizeUser){
    return users.map(value => {
        return changeUserForSearchRes(value, authorizeUser);
      })
}

function updateAvatarsForArrayUsers(users){
    return users.map(user => { return updateUserAvatarPaths(user); });
}

module.exports = {
    getFriendState,
    itsMe,
    changeUserForSearchRes,
    changeUserForMessage,
    changeUserForClient,
    updateAvatarsForArrayUsers,
    updateUserArrayForSend
}