import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';


class Avatar extends React.Component {

    render() {
      const { user, onLoadAvatarClick } = this.props;   
      const forRender = (user) ? <AvatarImageControl onLoadAvatarClick={onLoadAvatarClick} user={user} /> : <div className="avatar-emitter" />
      return (
        <Paper className="avatar-wrapper">
            <div>{forRender}</div>
            <div className="edit-button-wrapper">
            <Link to={`/edit`}>
                <Button className="edit-button" variant="contained" color="primary">Редактировать</Button>
            </Link>
            </div>
        </Paper>
      )
    }
  }


class AvatarImageControl extends React.Component
{
  render(){
    let { user, onLoadAvatarClick } = this.props;
    return (
      <div className="avatar-image-wrapper"> 
        <img src={user.minAvatar} alt="avatar" />
        <div className="load-avatar">
           <span onClick={onLoadAvatarClick} className="toLoadAvatar">Обновить аватар</span>
        </div>
      </div>
    )
  }
}

export default Avatar;