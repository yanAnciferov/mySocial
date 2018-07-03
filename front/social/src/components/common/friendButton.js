import React, { Component } from 'react';
import Button from '@material-ui/core/Button/Button';
import { FRIEND_STATES } from '../../constans/profile';
import { SearchContent } from '../../content/search';
import { connect } from 'react-redux';
import { onSubscribed, onAccept } from '../../socket';

class FriendButton extends Component {

    render(){
      let { user, onSubsribed, onAccept } = this.props;
      
      if(user.itsMy) return null;

      let content, handler;
      switch(user.friendState){
          case FRIEND_STATES.FRIEND_INCOMING: 
            content = SearchContent.buttonAccept;
            handler = ()=>{onAccept(user._id);}
            break;
          case FRIEND_STATES.FRIEND_NO: 
            content = SearchContent.buttonAdd;
            handler = ()=>{onSubsribed(user._id);}
            break;
          case FRIEND_STATES.FRIEND_YES: 
            content = SearchContent.buttonRemove;
            handler = ()=>{}
            break;
          case FRIEND_STATES.FRIEND_OUTGOING: 
            content = SearchContent.buttonReject;
            handler = ()=>{}
            break;
          default:
            return null;
        }         
        return <Button onClick={handler} variant="contained" color="primary">{content}</Button>
    }
  }

export default connect(

  dispatch => ({
      subscribeToUser: (email) => {
          dispatch(onSubscribed(email))
      },
      acceptToFriend: (id) => {
          dispatch(onAccept(id))
      }
  })
)(FriendButton);
  