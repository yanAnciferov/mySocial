import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';
import CommonContent  from "../../../content/common"
import { PROFILE_CONTENT } from '../../../content/profile';
import FriendButton from "../../../components/common/friendButton"

class Avatar extends React.Component {

    render() {
      const { user, onLoadAvatarClick, isMyPage, t } = this.props;
    
      const forRender = user ? 
        <AvatarImageControl t={t} isMyPage={isMyPage} onLoadAvatarClick={onLoadAvatarClick} user={user} /> 
          : <div className="avatar-emitter" />
      return (
        <Paper className="avatar-wrapper">
            <div>{forRender}</div>
        </Paper>
      )
    }
  }


class AvatarButton extends React.Component
{
  render() {
    let { isMyPage, user, t } = this.props;
    let forRender = isMyPage ? 
      <Link to={`/edit`}>
        <Button className="edit-button" variant="contained" color="primary">{t(CommonContent.Edit)}</Button>
      </Link> : 
      <FriendButton user={user} className="edit-button" />

    return (
      <div>{forRender}</div>
    )
  }
}


class AvatarImageControl extends React.Component
{
  render(){
    let { user, onLoadAvatarClick, isMyPage, t } = this.props;
    let forRenderLoadControl = isMyPage ? (
      <div className="load-avatar">
        <span onClick={onLoadAvatarClick} className="toLoadAvatar">{t(PROFILE_CONTENT.UPDATE_AVATAR)}</span>
      </div>
    ) : null
    
    return (
      <div>
        <div className="avatar-image-wrapper"> 
          <img src={user.minAvatar} alt="avatar" />
          {forRenderLoadControl}
        </div>
        <div className="edit-button-wrapper">
          <AvatarButton t={t} user={user} isMyPage={isMyPage} />
        </div>
      </div>
    )
  }
}

export default Avatar;