import {AppBar, Button, Toolbar, Menu ,Typography} from '@material-ui/core';
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper/Paper';


class Avatar extends React.Component {

    render() {
      var { user } = this.props;   
      var forRender = (user !== null) ? <img src={user.minAvatar} /> : <div className="avatar-emitter" />
      return (
           <Paper className="avatar-wrapper">
                {forRender}
           </Paper>
      )
    }
  }


export default Avatar;