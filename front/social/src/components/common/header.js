import {AppBar, Button, Toolbar, Menu ,Typography, MenuItem} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

import content from "../../content/header"
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import CircleAvatar from "./circleAvatar"
import { disconnectToServer } from '../../socket';
import translate from 'react-i18next/dist/commonjs/translate';

class Header extends React.Component {

    onLogoutClick = () => {
      this.setState({ anchorEl: null });      
      this.props.onLogout();
    }
  
    render() {

      const { t, app: { authorizedUser } } = this.props;
      const forRightSide = (authorizedUser) ? <HeaderPopupMenu t={t} authorizedUser={authorizedUser} onLogoutClick={this.onLogoutClick}  /> : <UnauthorizedMenu t={t}/>
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
              {forRightSide}               
            </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }

class UnauthorizedMenu extends React.Component {
  render(){
    return (
      <div className="unauthorized-menu">
        <Link to="/login">
          <Button>
              {content.ToLogin}
          </Button>
        </Link>
        <Link to="/registration">
            <Button>
                {content.ToRegistration}
            </Button>
        </Link>
      </div>
    )
  }
}


class HeaderPopupMenu extends React.Component {

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  state = {
    anchorEl: null,
  };

  render()
  {
    const { onLogoutClick, authorizedUser, t } = this.props; 
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="header-menu-wrapper">
        <Typography className="header-name">{authorizedUser.firstname}</Typography>
        <div className="header-avatar" onClick={this.handleMenu}>
          <CircleAvatar imageUrl={authorizedUser.minAvatar}/>
        </div>
        <Menu
          className="header-popap-menu"
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
          <MenuItem onClick={this.handleClose}>{t(content.ToMyPage)}</MenuItem>
          <MenuItem onClick={onLogoutClick}> {t(content.ToLogout)}</MenuItem>
        </Menu>
      </div>
    )
  }
}


  export default translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      onLogout: () => {
        dispatch({ type: ACTION_FOR_APP.LOGOUT});
        disconnectToServer();
      }
  })
)(Header));