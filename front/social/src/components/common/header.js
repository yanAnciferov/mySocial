import {AppBar, Button, Toolbar, Menu ,Typography, IconButton, MenuItem} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Manager, Target, Popper } from 'react-popper';

import content from "../../content/header"
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import CircleAvatar from "./circleAvatar"

class Header extends React.Component {

    onLogoutClick = () => {
      this.setState({ anchorEl: null });      
      this.props.onLogout();
    }

    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    state = {
      anchorEl: null,
    };
  
    render() {

      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);

      const { isAuthorize, authorizedUser } = this.props.app;
      return (
        <div className="main-header">
          <AppBar position="static">
            <Toolbar className="header-toolbar">
            <div>
                <Typography variant="title" color="inherit" >
                    {content.SiteName}
                </Typography>
            </div>
            <div>
              {
                (()=>{
                  if(authorizedUser === null){
                  return (<div>
                    <Link to="/login">
                    <Button color="inherit">
                        {content.ToLogin}
                    </Button>
                    </Link>
                    <Link to="/registration">
                        <Button color="inherit">
                            {content.ToRegistration}
                        </Button>
                    </Link>
                  </div>)
                  }else {
                    return (<div className="header-menu-wrapper">
                        <Typography className="header-name">{authorizedUser.firstname}</Typography>
                        <div className="header-avatar" onClick={this.handleMenu}>
                          <CircleAvatar imageUrl={authorizedUser.minAvatar}/>
                        </div>
                        <Menu
                          style={{marginTop:"2.8em"}}
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                          open={open}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.handleClose}>{content.ToMyPage}</MenuItem>
                          <MenuItem onClick={this.onLogoutClick}> {content.ToLogout}</MenuItem>
                        </Menu>
                      </div>)
                  }
                })()
              }
               
            </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }


  export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      onLogout: () => {
        dispatch({ type: ACTION_FOR_APP.LOGOUT});
      }
  })
)(Header);