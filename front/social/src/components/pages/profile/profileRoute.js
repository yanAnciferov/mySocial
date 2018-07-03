import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../profile/profile';
import Friends from '../friends/friend';
import { getUserData } from '../../../actions/Users';
import { getAuthUserData } from '../../../actions/Account';

class ProfileRoutes extends Component {
  
    componentWillMount(){
        this.update(this.props.id);
    }
  
    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.props.id)
            this.update(nextProps.id);
    }
  
    update(id){
        const {props} = this;
        if(id !== props.app.authorizedUser._id)
            props.onEnter(id);
        else props.getMyData();
    }


  render() {
    const { authorizedUser } = this.props.app;
    const isAuthorize = authorizedUser !== null;
    return (
        <Switch>
            <Route exact path="/:id" render={({ match:pathlessMatch }) => (
                isAuthorize ? (<Profile id={pathlessMatch.params.id}/>) : (<Redirect from="/:id" to="/login"/>)
            )}/>
            <Route exact path="/:id/friends" render={({ match:pathlessMatch }) => (
                isAuthorize ? (<Friends id={pathlessMatch.params.id}/>) : (<Redirect from="/friends/:id" to="/login"/>)
            )}/>
        </Switch>
    )
  }
}


export default withRouter(connect(
  state => ({
      app: state.app,
      catcher: state.catcher
  }),
  dispatch => ({
    onEnter: (id) => {
        dispatch(getUserData(id))
    },
    getMyData(){
        dispatch(getAuthUserData())
    },
  })
)(ProfileRoutes))


