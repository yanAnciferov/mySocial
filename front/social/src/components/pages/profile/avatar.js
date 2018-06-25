import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';


class Avatar extends React.Component {

    render() {
      const { user } = this.props;   
      const forRender = (user) ? <img src={user.minAvatar} alt="avatar" /> : <div className="avatar-emitter" />
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


export default Avatar;