import {AppBar, Button, Toolbar, Menu ,Typography} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import content from "../../content/header"
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';


class Header extends React.Component {

    onLogoutClick = () => {
      this.props.onLogout();
    }
  
    render() {
      const { isAuthorize } = this.props.app;
      return (
        <div>
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
                  if(!isAuthorize){
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
                    return (<div>
                      <Button color="inherit" onClick={this.onLogoutClick}>
                          {content.ToLogout}
                      </Button>
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