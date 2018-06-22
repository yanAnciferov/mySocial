import {AppBar, Button, Toolbar, Menu ,Typography} from '@material-ui/core';
import React, { Component } from 'react';


class CircleAvatar extends React.Component {
    render() {
      return (
       <div>
           <div className="circle-avatar">
              <img src={this.props.imageUrl} />
           </div>
       </div>
      )
    }
  }


export default CircleAvatar;