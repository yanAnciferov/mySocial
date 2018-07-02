import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"

import Registration from "../pages/registration/registration"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import Edit from '../pages/edit/edit';
import Search from '../pages/search/search';

class Routes extends Component {
  
  render() {
    const { authorizedUser } = this.props.app;
    const isAuthorize = authorizedUser !== null;
    const toMyPagePath = isAuthorize ? `/${authorizedUser._id}` : "/login";
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
          <Route path="/edit" render={() => (
            isAuthorize ? (<Edit/>) : (<Redirect from="/edit" to="/login"/>)
          )}/>
            <Route path="/search" render={() => (
            isAuthorize ? (<Search/>) : (<Redirect from="/search" to="/login"/>)
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


