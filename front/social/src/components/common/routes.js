import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"

import Welcome from "../pages/helloWorld"
import Registration from "../pages/registration/registration"
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from '../../constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';

class Routes extends Component {
  
  render() {
    var { authorizedUser } = this.props.app;
    var isAuthorize = authorizedUser !== null;
    var toMyPagePath = isAuthorize ? `/${authorizedUser._id}` : "/login";
    return (
      <div className="main-content">
      <Switch>
          <Route exact path="/" render={() => (
            <Redirect to={toMyPagePath}/>
          )}/>
          <Route path="/registration" render={() => (
            isAuthorize ? (<Redirect to={toMyPagePath}/>) : (<Registration/>)
          )}/>
          <Route path="/login" render={() => (
            isAuthorize ? (<Redirect to={toMyPagePath}/>) : (<Login/>)
          )}/>
          <Route  children={({ match }) => (
            <Route path="/:id" render={({ match:pathlessMatch }) => (
              isAuthorize ? (<Profile id={pathlessMatch.params.id}/>) : (<Redirect from="/:id" to="/login"/>)
            )}/>
          )}/>
          <Route/>
        </Switch>
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


