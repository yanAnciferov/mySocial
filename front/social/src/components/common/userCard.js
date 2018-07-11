import React, { Component } from 'react';
import { PROFILE_CONTENT } from "../../content/profile";
import { Link } from 'react-router-dom';
import FriendButton from './friendButton'
import { translate } from 'react-i18next';

class UserCard extends Component {   

    render() {
      let { getFullName, getAge, getSex, yearsOld } = PROFILE_CONTENT;
      let { user, t } = this.props;
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
                <div className="user-card-field">{t(PROFILE_CONTENT.AGE_INFO)}: {t(yearsOld, { year: getAge(user.birthdate) })} </div>
                <div className="user-card-field">{t(PROFILE_CONTENT.SEX_INFO)}: {t(getSex(user.sex))} </div>
            </div>
          </div>
          <div className="user-card-button"> 
            <FriendButton user={user} />
          </div>
        </div>
      );
    }
}

export default translate("translations")(UserCard)
