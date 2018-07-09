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
import { translate } from 'react-i18next';

class Profile extends Component {

    render() {
      const { 
        onLoadAvatarOpen, 
        onLoadAvatarClose, 
        id,
        profile:{ userData, isNotFound, isShowAvatarPicker }, 
        app: {authorizedUser },
        t
      } = this.props;
      
      const isMyPage = id === authorizedUser._id;
      const forRender = (isNotFound) ? <NotFound t={t}/> : 
        <Found
          onLoadAvatarOpen={onLoadAvatarOpen}  
          user={userData}
          isMyPage={isMyPage}
          isShowAvatarPicker={isShowAvatarPicker}
          onLoadAvatarClose={onLoadAvatarClose}
          t={t}/>
      
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
        isMyPage,
        t
      } = this.props;
    
      return (
        <div className="profile-page">
          <div className="left-side-profile">
              <Avatar t={t} isMyPage={isMyPage} onLoadAvatarClick={onLoadAvatarOpen} user={user}/>
              <FriendsBlock t={t} user={user}/>
          </div>
          <div className="right-side-profile">
              <MainInfo t={t} isMyPage={isMyPage} user={user}/>
              <PublicationOnProfile t={t} isMyPage={isMyPage} />
              <Wall t={t} isMyPage={isMyPage} user={user}/>              
          </div>
          <UpdateAvatarWindow t={t} onClose={onLoadAvatarClose} open={isShowAvatarPicker}/>
        </div>
      )
    }
}

class NotFound extends Component
{
  render(){
    let { t } = this.props;
    return (
      <div className="not-found-wrapper">
        <Paper className="not-found-papper">
          <span>{t(PROFILE_CONTENT.PAGE_NOT_FOUNT)}</span>
        </Paper>
      </div>
    )
  }
}

export default translate("translations")(connect(
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
)(Profile));