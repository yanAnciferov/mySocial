var { consoleLogErrorHandler } = require("../errorHandlers/common");
var { JOIN, OUTGOING, INCOMING, ACCEPT, ACCEPTED, REMOVE, REMOVED, REJECT, REJECTED }  = require("../../constants/socketEvents");
var { userQueries } = require("../../constants/common");
var { Promise } = require( "mongoose");
var { User } = require("../../models/User");
var { changeUserForSearchRes } = require("../../models/UserUtils");
var { updateUserAvatarPaths } = require("../../scripts/utils")

module.exports = function (socket, io) {
    let { commonUserQuery } = userQueries;
    
    socket.on(JOIN, (data)=>{
        socket.join(data.id);
    })
    
    socket.on(OUTGOING, (data) => {
       friendsHandler(data, socket, io, outgoingDelegate, {
           to: INCOMING,
           from: OUTGOING
       });        
    });

    socket.on(ACCEPT, (data)=>{
        friendsHandler(data, socket, io, acceptDelegate, {
            to: ACCEPTED,
            from: ACCEPT
        });
    })

    socket.on(REMOVE, (data) => {
        friendsHandler(data, socket, io, removeDelegate, {
            to: REMOVE,
            from: REMOVED
        });
    });


    socket.on(REJECT, (data) => {
        friendsHandler(data, socket, io, rejectDelegate, {
            to: REJECTED,
            from: REJECT
        })        
    });
}

function friendsHandler(data, socket, io, delegate, resActions){
    let { from, to } = data.response;       
        
    Promise.all([User.findById(from.id, userQueries.commonUserQuery), User.findById(to.id, userQueries.commonUserQuery)])
        .then(results => {
            if(results.indexOf(null) !== -1) return;

            let [ fromRes, toRes ] = results;

            if(!delegate(fromRes, toRes)){
                return;
            }
            
            Promise.all([fromRes.save(), toRes.save()])
                .then(() => {
                    io.sockets.in(from.id).emit(resActions.from, { user: changeUserForSearchRes(toRes._doc, fromRes._doc) });
                    socket.to(to.id).emit(resActions.to, { user: changeUserForSearchRes(fromRes._doc, toRes._doc) });        
                }).catch(err => consoleLogErrorHandler(err));    

        }).catch(err => consoleLogErrorHandler(err))
}

function outgoingDelegate(outgoingUser, incomingUser){
    if(checkOnContainInOutgoingAndIncomig(outgoingUser, incomingUser)){
        outgoingUser.outgoing.push(incomingUser._id);
        incomingUser.incoming.push(outgoingUser._id);
        return true;
    }
    return false;
}

function acceptDelegate(outgoingUser, incomingUser){
    let result = checkOnOutgoing(outgoingUser, incomingUser);
    if(result && checkOnContainInFriends(outgoingUser, incomingUser)){
        outgoingUser.friends.push(incomingUser._id);
        incomingUser.friends.push(outgoingUser._id);
        
        outgoingUser.incoming.splice(result.out,1);
        incomingUser.outgoing.splice(result.in,1);
        return true;
    }return false;
}

function removeDelegate(removing, removable){
    if(!checkOnContainInFriends(removing, removable) 
        && checkOnContainInOutgoingAndIncomig(removing, removable)){
          
        let removingIndex = findUserInArray(removing.friends, removable);
        let removableIndex = findUserInArray(removable.friends,removing);
    
        if(removingIndex !== -1 && removableIndex !== -1)
        {
            removing.friends.splice(removingIndex, 1);
            removable.friends.splice(removableIndex, 1);
        }
        else return false;

        removable.outgoing.push(removing._id);
        removing.incoming.push(removable._id);
        return true;
    }
    return false;
}


function rejectDelegate(rejecting, rejectble){
    if(!checkOnContainInOutgoingAndIncomig(rejecting, rejectble)){

        let rejectionIndex = findUserInArray(rejecting.outgoing, rejectble);
        let rejectbleIndex = findUserInArray(rejectble.incoming, rejecting);

        if(rejectionIndex !== -1 && rejectbleIndex !== -1){
            rejecting.outgoing.splice(rejectionIndex,1);
            rejectble.incoming.splice(rejectbleIndex,1);
            return true;
        }       
    }
    return false;
}

function checkOnContainInOutgoingAndIncomig(outgoingUser, incomingUser){
    return outgoingUser.outgoing.indexOf(incomingUser._id) == -1 &&
    incomingUser.incoming.indexOf(outgoingUser._id) == -1 &&
    outgoingUser.incoming.indexOf(incomingUser._id) == -1 &&
    incomingUser.outgoing.indexOf(outgoingUser._id) == -1
}


function checkOnContainInFriends(outgoingUser, incomingUser){
    return outgoingUser.friends.indexOf(incomingUser._id) == -1 && 
        incomingUser.friends.indexOf(outgoingUser._id) == -1
}

function checkOnOutgoing(outgoingUser, incomingUser){
    let index1 = findUserInArray(incomingUser.outgoing,outgoingUser);
    let index2 = findUserInArray(outgoingUser.incoming,incomingUser);

    return (index1 !== -1 && index2 !== -1) ? { out: index2,  in: index1 } : null;
}

function findUserInArray(array, user){
    return array.findIndex(value => { return user._id.toString(16) === value._id.toString(16)})

}