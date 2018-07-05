import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../profile/profile';
import Friends from '../friends/friend';
import { getUserData } from '../../../actions/Users';
import { getAuthUserData } from '../../../actions/Account';
import { MENU_LINKS } from '../../../constans/common';

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
        if(!props.app.authorizedUser)
            return
        if(id !== props.app.authorizedUser._id)
            props.onEnter(id);
        else props.getMyData();
    }


  render() {
    const { authorizedUser } = this.props.app;
    const isAuthorize = authorizedUser !== null;
    const { ID, FRIENDS, LOGIN } = MENU_LINKS;
    return (
        <Switch>
            <Route exact path={`/${ID}${FRIENDS}`} render={({ match:pathlessMatch }) => (
                isAuthorize ? (<Friends id={pathlessMatch.params.id}/>) : (<Redirect from={`/${ID}${FRIENDS}`} to={LOGIN}/>)
            )}/>
            
            <Route path={ID} render={({ match:pathlessMatch }) => (
                isAuthorize ? (<Profile id={pathlessMatch.params.id}/>) : (<Redirect from={ID} to={LOGIN}/>)
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


