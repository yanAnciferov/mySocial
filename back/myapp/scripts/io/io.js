var { consoleLogErrorHandler } = require("../errorHandlers/common");

var { JOIN, OUTGOING, INCOMING, ACCEPT, ACCEPTED }  = require("../../constants/socketEvents");

var { userQueries } = require("../../constants/common");
var { Promise } = require( "mongoose");
var { User } = require("../../models/User");
var { changeUserForMessage } = require("../../models/UserUtils");
var { updateUserAvatarPaths } = require("../../scripts/utils")


module.exports = function (socket, io) {
    let { commonUserQuery, forMessageUserQuery } = userQueries;
    
    socket.on(JOIN, (data)=>{
        socket.join(data.id);
    })
    
    socket.on(OUTGOING, (data) => {

        let { from, to } = data.response;       
        
        Promise.all([User.findById(to.id, commonUserQuery), User.findById(from.id, commonUserQuery)])
            .then(results => {
                if(results.indexOf(null) !== -1){
                    return;
                }
                let [ incomingUser, outgoingUser ] = results;

                if(checkOnContainInOutgoingAndIncomig(outgoingUser, incomingUser)){
                    outgoingUser.outgoing.push(incomingUser._id);
                    incomingUser.incoming.push(outgoingUser._id);
                }

                Promise.all([outgoingUser.save(), incomingUser.save()])
                    .then(results => {
                        io.sockets.in(from.id).emit(OUTGOING, { subscribed: changeUserForMessage(incomingUser) });
                        socket.to(to.id).emit(INCOMING, { subscriber: changeUserForMessage(outgoingUser) });        
                    }).catch(err => consoleLogErrorHandler(err));    

            }).catch(err => consoleLogErrorHandler(err))
        
    });

    

    socket.on(ACCEPT, (data)=>{
        let { from, to } = data.response;
        
        Promise.all([User.findById(to.id, commonUserQuery), User.findById(from.id, commonUserQuery)])
            .then(results => {
                if(results.indexOf(null) !== -1){
                    return;
                }

                let [ incomingUser, outgoingUser ] = results;
    
                if(checkOnContainInFriends(outgoingUser, incomingUser)){
                    outgoingUser.friends.push(incomingUser._id);
                    incomingUser.friends.push(outgoingUser._id);

                    outgoingUser.incoming.splice(outgoingUser.incoming.findIndex(
                        value => { return incomingUser._id === value._id },1))
                    incomingUser.outgoing.splice(incomingUser.outgoing.findIndex(
                        value => { return outgoingUser._id === value._id },1))
                     
                }

                Promise.all([outgoingUser.save(), incomingUser.save()])
                    .then(results => {
                        io.sockets.in(from.id).emit(ACCEPTED, { subscribed: changeUserForMessage(incomingUser) });
                        socket.to(to.id).emit(ACCEPT, { subscriber: changeUserForMessage(outgoingUser) });        
                    }).catch(err => consoleLogErrorHandler(err));    

            })
    })
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