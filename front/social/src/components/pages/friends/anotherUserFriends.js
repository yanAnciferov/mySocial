import React, { Component } from 'react';
import { Paper, Tabs, Tab } from "@material-ui/core"
import UserList from "../../common/usersList"
import { FriendContent } from '../../../content/friend';
import { Link } from 'react-router-dom';


class AnotherUserFriends extends Component {

    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

      
    render() { 
        let { anotherEmptyMessages } = FriendContent;
        const { value } = this.state;
        const { friends, incoming, user, t } = this.props;
        const lists = [friends, incoming];
        let forRender = lists[value].length ? <UserList usersList={lists[value]} />
             : <div className="friends-list-empty">{t(anotherEmptyMessages[value])}</div>
        return (
        <div className="friends-wrapper">
            <Paper className="friends-content">
            <div className="friends-content-header"> 
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label={t(FriendContent.title)} />
                    <Tab label={t(FriendContent.subscribersLabel)} />
                </Tabs>
                <LinkToUser user={user} />
            </div>
            
            <div className="friends-list-wrapper">
                {forRender}
            </div>
            </Paper>
        </div>
      );
    }
}


class LinkToUser extends Component
{
    render(){
        let { user } = this.props;
        if(!user) return null;
        return (
           <Link to={`/${user._id}`}>
            <div className="toUser-wrapper">
                <div className="toUser-name">
                    {user.firstname}
                </div>
                <div className="toUser-avatar">
                    <img src={user.minAvatar} alt="ava" />
                </div>
            </div>
           </Link>
        )
    }
}


export default AnotherUserFriends;