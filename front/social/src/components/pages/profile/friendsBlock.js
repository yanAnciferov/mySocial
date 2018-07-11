import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import { PROFILE_CONTENT } from '../../../content/profile';
import { translate } from 'react-i18next';

class FriendsBlock extends Component {

    render() {
      let { user, t } = this.props;
      if(!user)
        return <FriendsBlockEmmit />
      if(!user.friends.length)
        return null;
      return (
        <div className="profile-friends papper">
          <div className="paper-header">
            <Link className="friends-link" to={`/${user._id}/friends`}>{t(PROFILE_CONTENT.MY_FRIENDS)}</Link>
          </div>
          <div className="min-friends-list">
            {user.friends.slice(0, 6).map((value, index) => {
              return <li key={index} className="min-friend-wrapper">
                        <UserViewForFriendBlock user={value} />
                    </li>
            })}
          </div>
        </div>
      );
    }
}


class FriendsBlockEmmit extends React.Component
{
  render()
  {
    return (
      <div className="profile-friends-emmit papper">
          <div className="emmit-block"/>
          <div className="min-friends-list">
            {[0,1,2,3,4,5].map(value => {
              return (
                <div key={value} className="emmit-friends-block">
                  <div className="emmit-circle" />
                  <div className="emmit-line"/>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}

class UserViewForFriendBlock extends React.Component
{
  render()
  {
    let { user } = this.props;
    return (
      <div>
        <div>
          <div className="min-friend-avatar" >
          <Link to={`/${user._id}`}>
            <img src={user.minAvatar} alt="friend"/>
          </Link>
          </div>
        </div>
        <div className="min-friend-name">
          <Link to={`/${user._id}`}>{user.firstname}</Link>
        </div>
      </div>
    )
  }
}

export default translate("translations")(FriendsBlock);
