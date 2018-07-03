import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyFriends from './myFriends';
import AnotherUserFriends from './anotherUserFriends';
import { getUserFriendList } from '../../../actions/Users';
import { getAuthUserFriendList } from '../../../actions/Account';
class Friends extends Component {

    componentWillMount(){
        this.update(this.props.id);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id)
            this.update(nextProps.id);
    }

    update(id){
        const {props} = this;
        if(id !== props.app.authorizedUser._id){
            props.getFriend(id);
        }
        else props.getMyFriend(id);
    }

    render() { 
        let forRender;
        let { 
            id: paramsId, 
            app: { authorizedUser, authorizedUser: { _id: myId } },
            profile: { friends, incoming, userData }
        } = this.props;
        if(paramsId === myId)
            forRender = <MyFriends user={authorizedUser}/>
        else forRender = <AnotherUserFriends user={userData} friends={friends} incoming={incoming} />
        return (
        <div >
           {forRender}
        </div>
      );
    }
}




export default connect(
    state => ({
        app: state.app,
        profile: state.profile
    }),
    dispatch => ({
        getFriend: (id) => {
            dispatch(getUserFriendList(id));
        },
        getMyFriend: (id) => {
            dispatch(getAuthUserFriendList(id));
        }
    })
)(Friends);