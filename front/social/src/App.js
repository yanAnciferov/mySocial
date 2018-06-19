import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import { Route } from "react-router-dom"

import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration"
import Header from "./components/common/header"
import { connect } from 'react-redux';
import { ACTION_COMMON, ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';

class App extends Component {
  
  render() {

    var { errorWindow } = this.props.app;
    var { onCloseErrorWindow } = this.props;
    return (
      <div>
        <Header />
        <Route path="/" exact component={Welcome}/>
        <Route path="/registration" component={Registration}/>
        <ErrorWindow onClose={onCloseErrorWindow} open={errorWindow.isVisible} value={errorWindow.message} />
     </div>
    );
  }
}


export default withRouter(connect(
  state => ({
      app: state.app
  }),
  dispatch => ({
    onCloseErrorWindow: () => {
        dispatch({ type: ACTION_FOR_APP.CLOSE_ERROR_WINDOW})
    }
  })
)(App))
