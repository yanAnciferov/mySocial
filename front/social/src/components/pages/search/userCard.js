import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import TextFormControl from "../../common/textFormControl"
import Button from '@material-ui/core/Button/Button';
import { TIME } from '../../../constans/common';
import { PROFILE_CONTENT } from "../../../content/profile";
import { Link } from 'react-router-dom';
import { FRIEND_STATES } from '../../../constans/profile';
import { SearchContent } from '../../../content/search';

class UserCard extends Component {   

    render() {
      let { getFullName, getAge, getSex } = PROFILE_CONTENT;
      let { user, onSubsribed, onAccept } = this.props;
      return (
        <div className="user-card">
          <div className="user-card-info">
            <div className="user-card-avatar">
              <img src={user.minAvatar} alt={getFullName(user)} />
            </div>
            <div className="user-card-fields">
                <div className="user-card-name">
                  <Link to={`/${user._id}`}>
                    <span >{getFullName(user)} </span>
                  </Link>
                </div>
                <div className="user-card-field">{PROFILE_CONTENT.AGE_INFO} {getAge(user.birthdate)} </div>
                <div className="user-card-field">{PROFILE_CONTENT.SEX_INFO} {getSex(user.sex)} </div>
            </div>
          </div>
          <div className="user-card-button"> 
            <FriendButton onAccept={onAccept} onSubsribed={onSubsribed} user={user} />
          </div>
        </div>
      );
    }
}

class FriendButton extends Component {

  render(){
    let { user, onSubsribed, onAccept } = this.props;
    
    if(user.itsMy)
      return null;
    
      switch(user.friendState){
          case FRIEND_STATES.FRIEND_INCOMING: 
            return <Button onClick={()=>{onAccept(user._id);}} variant="contained" color="primary">{SearchContent.buttonAccept}</Button>
          case FRIEND_STATES.FRIEND_NO: 
            return <Button onClick={()=>{onSubsribed(user._id)}} variant="contained" color="primary">{SearchContent.buttonAdd}</Button>
          case FRIEND_STATES.FRIEND_YES: 
            return <Button variant="contained" color="primary">{SearchContent.buttonRemove}</Button>;
          case FRIEND_STATES.FRIEND_OUTGOING: 
            return <Button variant="contained" color="primary">{SearchContent.buttonReject}</Button>
      }         
     
  }
}

export default UserCard
