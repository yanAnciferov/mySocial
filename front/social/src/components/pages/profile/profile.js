import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import Avatar from './avatar'
import MainInfo from './mainInfo'
import { PROFILE_CONTENT } from '../../../content/profile';
import { ACTION_FOR_PROFILE } from '../../../constans/ActionTypes';
import UpdateAvatarWindow from './updateAvatarWindow';
import FriendsBlock from './friendsBlock';
import PublicationOnProfile from "../../common/publicationOnProfile";
import Wall from './wall';

class Profile extends Component {

    render() {
      const { 
        onLoadAvatarOpen, 
        onLoadAvatarClose, 
        id,
        profile:{ userData, isNotFound, isShowAvatarPicker }, 
        app: {authorizedUser } 
      } = this.props;
      
      const isMyPage = id === authorizedUser._id;
      const forRender = (isNotFound) ? <NotFound/> : 
        <Found
          onLoadAvatarOpen={onLoadAvatarOpen}  
          user={userData}
          isMyPage={isMyPage}
          isShowAvatarPicker={isShowAvatarPicker}
          onLoadAvatarClose={onLoadAvatarClose}/>
      
      return (
        <div >
            {forRender}
        </div>
      );
    }
}

class Found extends Component
{
    render(){
      let { 
        user,
        onLoadAvatarOpen,
        onLoadAvatarClose, 
        isShowAvatarPicker, 
        isMyPage
      } = this.props;
    
      return (
        <div className="profile-page">
          <div className="left-side-profile">
              <Avatar isMyPage={isMyPage} onLoadAvatarClick={onLoadAvatarOpen} user={user}/>
              <FriendsBlock user={user}/>
          </div>
          <div className="right-side-profile">
              <MainInfo isMyPage={isMyPage} user={user}/>
              <PublicationOnProfile isMyPage={isMyPage} />
              <Wall isMyPage={isMyPage} user={user}/>              
          </div>
          <UpdateAvatarWindow onClose={onLoadAvatarClose} open={isShowAvatarPicker}/>
        </div>
      )
    }
}

class NotFound extends Component
{
  render(){
    return (
      <div className="not-found-wrapper">
        <Paper className="not-found-papper">
          <span>{PROFILE_CONTENT.PAGE_NOT_FOUNT}</span>
        </Paper>
      </div>
    )
  }
}

export default connect(
  state => ({
      profile: state.profile,
      app: state.app
  }),
  dispatch => ({
    onLoadAvatarOpen(){
      dispatch({type: ACTION_FOR_PROFILE.LOAD_AVATAR_OPEN})
    },
    onLoadAvatarClose(){
      dispatch({type: ACTION_FOR_PROFILE.LOAD_AVATAR_CLOSE})
    }
  })
)(Profile);