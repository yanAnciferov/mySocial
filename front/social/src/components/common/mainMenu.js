import {AppBar, Button, Toolbar, Menu ,Typography, MenuList, MenuItem, ListItemText} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import content from "../../content/header"
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import Paper from '@material-ui/core/Paper/Paper';


class MainMenu extends React.Component {

    onLogoutClick = () => {
      this.props.onLogout();
    }
  
    render() {
      const { isAuthorize, authorizedUser } = this.props.app;
      return (
        <div className="main-menu">
         <Paper className="main-menu-paper">
            <MenuList>
                <Link to={`/${authorizedUser._id}`}>
                    <MenuItem >
                        <ListItemText primary="Моя страница" />
                    </MenuItem>
                </Link>
                <MenuItem >
                    <ListItemText primary="Друзья" />
                </MenuItem>
                <MenuItem>
                    <ListItemText primary="Поиск" />
                </MenuItem>
                <MenuItem>
                    <ListItemText primary="Новости" />
                </MenuItem>
                <MenuItem>
                    <ListItemText primary="Настройки" />
                </MenuItem>
            </MenuList>
         </Paper>
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
)(MainMenu);