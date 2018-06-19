import {AppBar, Button, Toolbar, Menu ,Typography} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Header extends React.Component {
    state = {
      auth: true,
      anchorEl: null,
    };
  
    handleChange = (event, checked) => {
      this.setState({ auth: checked });
    };
  
    handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
  
    render() {
      const { classes } = this.props;
      const { auth, anchorEl } = this.state;
      const open = Boolean(anchorEl);
  
      return (
        <div>
          <AppBar position="static">
            <Toolbar className="header-toolbar">
            <div>
                <Typography variant="title" color="inherit" >
                    My Social Network
                </Typography>
            </div>
            <div>
                <Link to="/">
                    <Button color="inherit">
                        Домой
                    </Button>
                </Link>
                <Link to="/registration">
                    <Button color="inherit">
                        Регистрация
                    </Button>
                </Link>
            </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }


export default (Header);