import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button';
import { FRIEND_STATES } from '../../constans/profile';
import { SearchContent } from '../../content/search';
import { connect } from 'react-redux';
import { onChangeFriendState } from '../../socket';
import { ACCEPT, OUTGOING, REMOVE, REJECT } from '../../constans/socketEvents';

class FriendButton extends Component {

    render(){
      let { user, changeFriendState } = this.props;
      
      if(user.itsMy)
        return null;
      
      let content, handler;
      switch(user.friendState){
          case FRIEND_STATES.FRIEND_INCOMING: 
            content = SearchContent.buttonAccept;
            handler = ()=>{changeFriendState(user._id, ACCEPT);}
            break;
          case FRIEND_STATES.FRIEND_NO: 
            content = SearchContent.buttonAdd;
            handler = ()=>{changeFriendState(user._id, OUTGOING);}
            break;
          case FRIEND_STATES.FRIEND_YES: 
            content = SearchContent.buttonRemove;
            handler = ()=>{changeFriendState(user._id, REMOVE);}
            break;
          case FRIEND_STATES.FRIEND_OUTGOING: 
            content = SearchContent.buttonReject;
            handler =()=>{changeFriendState(user._id, REJECT);}
            break;
          
          default:
            return null;
        }
        return <Button onClick={handler} variant="contained" color="primary">{content}</Button>
    }
  }
  
export default connect(
  state => ({}),
  dispatch => ({
    changeFriendState: (id, action) => {
        dispatch(onChangeFriendState(id, action));
      }
  })
)(FriendButton);
  