import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import LoaderWindow from "./components/common/loadingWindow"
import { Route } from "react-router-dom"

import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration"
import Header from "./components/common/header"
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Login from './components/pages/login/login';

class App extends Component {
  
  render() {
    var { loadingWindow } = this.props.app;
    var { errorWindow} = this.props.catcher;
    var { onCloseErrorWindow } = this.props;
    return (
      <div>
        <Header />
        <Route path="/" exact component={Welcome}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/login" component={Login}/>
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
