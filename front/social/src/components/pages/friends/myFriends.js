import React, { Component } from 'react';
import { Tabs, Tab } from "@material-ui/core"
import UserList from "../../common/usersList"
import { FriendContent } from '../../../content/friend';


class MyFriends extends Component {

    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

      
    render() { 
        let { emptyMessages } = FriendContent;
        const { value } = this.state;
        const { user, t } = this.props;
        const lists = [user.friends, user.outgoing, user.incoming];
        let forRender = lists[value].length ? 
            <UserList usersList={lists[value]} /> 
            : <div className="friends-list-empty">{t(emptyMessages[value])}</div>
        return (
        <div className="friends-wrapper">
            <div className="friends-content papper">
            <Tabs  className="friends-content-tab" value={value} onChange={this.handleChange}>
                <Tab label={t(FriendContent.friendLabel)}/>
                <Tab label={t(FriendContent.outgoingLabel)}/>
                <Tab label={t(FriendContent.incomingLabel)}/>
            </Tabs>
            <div className="friends-list-wrapper">
                {forRender}
            </div>
            </div>
        </div>
      );
    }
}




export default MyFriends;