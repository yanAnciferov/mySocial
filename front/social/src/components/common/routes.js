import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom"

import Welcome from "../pages/helloWorld"
import Registration from "../pages/registration/registration"
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from '../../constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Login from '../pages/login/login';

class Routes extends Component {
  
  render() {
    var { isAuthorize } = this.props.app;
    return (
      <div className="main-content">
        <Route exact path="/" render={() => (
          isAuthorize ? (
            <Welcome/>
          ) : (
            <Redirect to="/login"/>
          )
        )}/>
        <Route exact path="/registration" render={() => (
          isAuthorize ? (
            <Redirect to="/"/>
          ) : (
            <Registration/>
          )
        )}/>
          <Route exact path="/login" render={() => (
          isAuthorize ? (
            <Redirect to="/"/>
          ) : (
            <Login/>
          )
        )}/>
     </div>
    )
  }
}


export default withRouter(connect(
  state => ({
      app: state.app,
      catcher: state.catcher
  })
)(Routes))


