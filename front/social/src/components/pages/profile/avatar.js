import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';


class Avatar extends React.Component {

    render() {
      const { user } = this.props;   
      const forRender = (user) ? <img src={user.minAvatar} alt="avatar" /> : <div className="avatar-emitter" />
      return (
           <Paper className="avatar-wrapper">
                {forRender}
           </Paper>
      )
    }
  }


export default Avatar;