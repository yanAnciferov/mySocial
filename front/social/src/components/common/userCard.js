import React, { Component } from 'react';
import { PROFILE_CONTENT } from "../../content/profile";
import { Link } from 'react-router-dom';
import FriendButton from './friendButton'

class UserCard extends Component {   

    render() {
      let { getFullName, getAge, getSex } = PROFILE_CONTENT;
      let { user } = this.props;
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
            <FriendButton user={user} />
          </div>
        </div>
      );
    }
}

export default UserCard