import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import LoaderWindow from "./components/common/loadingWindow"
import { Route, Redirect } from "react-router-dom"

import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration";
import Header from "./components/common/header";
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Login from './components/pages/login/login';
import Routes from './components/common/routes';
import MainMenu from './components/common/mainMenu'

class App extends Component {
  
  render() {
    var { loadingWindow, isAuthorize, authorizedUser } = this.props.app;
    var { errorWindow} = this.props.catcher;
    var { onCloseErrorWindow } = this.props;

    const menu = () => { return (authorizedUser !== null) ? <MainMenu/> : "" };
    return (
      <div>
        <Header />
        <div className="main-wrapper-content">
          { menu() }
          <Routes />
        </div>
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
