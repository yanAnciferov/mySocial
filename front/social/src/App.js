import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import LoaderWindow from "./components/common/loadingWindow"
import { Route, Redirect } from "react-router-dom"

import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration"
import Header from "./components/common/header"
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Login from './components/pages/login/login';

class App extends Component {
  
  render() {
    var { loadingWindow, isAuthorize } = this.props.app;
    var { errorWindow} = this.props.catcher;
    var { onCloseErrorWindow } = this.props;
    console.log(isAuthorize)
    return (
      <div>
        <Header />
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
        <ErrorWindow onClose={onCloseErrorWindow} open={errorWindow.isVisible} value={errorWindow.message} />
        <LoaderWindow open={loadingWindow.isVisible} value={loadingWindow.message} />
     </div>
    );
  }
}


export default withRouter(connect(
  state => ({
      app: state.app,
      catcher: state.catcher
  }),
  dispatch => ({
    onCloseErrorWindow: () => {
        dispatch({ type: ACTION_FOR_APP.CLOSE_ERROR_WINDOW})
    }
  })
)(App))
