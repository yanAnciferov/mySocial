import React, { Component } from 'react';
import { Paper } from "@material-ui/core";
import Link from 'react-router-dom/Link';

class FriendsBlock extends Component {

    render() {
      let { user } = this.props;
      if(!user || !user.friends.length)
        return null;
      return (
        <Paper className="profile-friends">
          <Link className="friends-link" to={`/${user._id}/friends`}>Друзья</Link>
          <div className="min-friends-list">
            {user.friends.map((value, index) => {
              return <li key={index} className="min-friend-wrapper">
                        <UserViewForFriendBlock user={value} />
                    </li>
            })}
          </div>
        </Paper>
      );
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

export default FriendsBlock;
