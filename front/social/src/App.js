import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import LoaderWindow from "./components/common/loadingWindow"

import Header from "./components/common/header";
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Routes from './components/common/routes';
import MainMenu from './components/common/mainMenu'

class App extends Component {
  
  render() {

    let {
      onCloseErrorWindow,
      app: {
        loadingWindow
      },
      catcher: {
        errorWindow
      }

    } = this.props;

    return (
      <div>
        <Header />
        <div className="main-wrapper-content">
          <MainMenu/>
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
