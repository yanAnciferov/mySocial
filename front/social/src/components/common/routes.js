import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"

import Registration from "../pages/registration/registration"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Login from '../pages/login/login';
import Edit from '../pages/edit/edit';
import Search from '../pages/search/search';
import ProfileRoutes from "../pages/profile/profileRoute"
import Feed from '../pages/feed/feed';
import { MENU_LINKS } from '../../constans/common';
import Settings from '../pages/settings/settings';


class Routes extends Component {
  
  render() {
    const { authorizedUser } = this.props.app;
    const isAuthorize = authorizedUser !== null;
    const toMyPagePath = isAuthorize ? `/${authorizedUser._id}` : MENU_LINKS.LOGIN;
    return (
      <div className="main-content">
      <Switch>
          <Route exact path={MENU_LINKS.DEFAULT} render={() => (
            <Redirect to={toMyPagePath}/>
          )}/>
          <Route path={MENU_LINKS.REGISTRATION} render={() => (
            isAuthorize ? (<Redirect to={toMyPagePath}/>) : (<Registration/>)
          )}/>
          <Route path={MENU_LINKS.LOGIN} render={() => (
            isAuthorize ? (<Redirect to={toMyPagePath}/>) : (<Login/>)
          )}/>
          <Route path={MENU_LINKS.EDIT}  render={() => (
            isAuthorize ? (<Edit/>) : (<Redirect from={MENU_LINKS.EDIT} to={MENU_LINKS.LOGIN}/>)
          )}/>
            <Route path={MENU_LINKS.SEARCH} render={() => (
            isAuthorize ? (<Search/>) : (<Redirect from={MENU_LINKS.SEARCH} to={MENU_LINKS.LOGIN}/>)
          )}/>
          <Route path={MENU_LINKS.SETTINGS} render={() => (
            isAuthorize ? (<Settings/>) : (<Redirect from="/settings" to={MENU_LINKS.LOGIN}/>)
          )}/>
          <Route path={MENU_LINKS.FEED} render={() => (
            isAuthorize ? (<Feed/>) : (<Redirect from={MENU_LINKS.FEED} to={MENU_LINKS.LOGIN}/>)
          )}/>
          <Route path={MENU_LINKS.ID} children={({ match }) => (
            <ProfileRoutes id={match.params.id}/>
          )}/>
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


