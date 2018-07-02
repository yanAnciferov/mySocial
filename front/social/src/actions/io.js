import io from 'socket.io-client';


export const subscribe = (id) => (dispatch, getState) => {
    const { isAuthorize } = getState().app;
    
    if(!isAuthorize)
      return;
  
} 