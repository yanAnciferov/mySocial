var { consoleLogErrorHandler } = require("../errorHandlers/common");
var { JOIN, OUTGOING, INCOMING, ACCEPT, ACCEPTED, REMOVE, REJECT, REJECTED }  = require("../../constants/socketEvents");
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

            delegate(fromRes, toRes);
            
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
    }
}

function acceptDelegate(outgoingUser, incomingUser){
    if(checkOnContainInFriends(outgoingUser, incomingUser)){
        outgoingUser.friends.push(incomingUser._id);
        incomingUser.friends.push(outgoingUser._id);

        outgoingUser.incoming.splice(outgoingUser.incoming.findIndex(
            value => { return incomingUser._id === value._id },1))
        incomingUser.outgoing.splice(incomingUser.outgoing.findIndex(
            value => { return outgoingUser._id === value._id },1))
         
    }
}

function removeDelegate(removing, removable){
    removing.friends.splice((value)=>{ return removable._id === value._id; }, 1)
    removable.friends.splice((value)=>{ return removing._id === value._id; }, 1)

    if(checkOnContainInOutgoingAndIncomig(removing, removable)){
        removable.outgoing.push(removing._id);
        removing.incoming.push(removable._id);
    }
}


function rejectDelegate(rejecting, rejectble){
    if(!checkOnContainInOutgoingAndIncomig(rejecting, rejectble)){
        rejecting.outgoing.splice(rejecting.outgoing.findIndex(
            value => { return rejectble._id === value._id },1))
            rejectble.incoming.splice(rejectble.incoming.findIndex(
            value => { return rejecting._id === value._id },1))
    }
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