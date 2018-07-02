import io from 'socket.io-client';
import { ACCEPT, OUTGOING, JOIN } from './constans/socketEvents';
import { DOMAIN } from './constans/apiUrl';


var socket = null;

function connectToServer(user){
    if(!user) return;

    let test = JSON.parse(user);
    socket = io.connect(DOMAIN);
    socket.emit(JOIN, { id: test._id });   
}

function socketOn(event,callback)
{
    if(!socket)
        return;
    socket.on(event, function(data){
        callback(data);
    })
}




const onSubscribed = (id) => (dispatch, getState) => {
    const { isAuthorize, authorizedUser } = getState().app;
    
    if(!isAuthorize)
      return;
  
    socket.emit(OUTGOING, { response: { from: { id: authorizedUser._id }, to: { id } } })
} 


const onAccept = (id) => (dispatch, getState) => {
    const { isAuthorize, authorizedUser } = getState().app;
    
    if(!isAuthorize)
      return;
    
    socket.emit(ACCEPT, { response: { from: { id: authorizedUser._id }, to: { id } } })
} 
  
  

function disconnectToServer(){
    socket.close();
}

export { 
    disconnectToServer,
    connectToServer,
    onSubscribed,
    socketOn,
    onAccept
}