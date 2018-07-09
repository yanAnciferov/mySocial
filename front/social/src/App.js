import React, { Component } from 'react';
import ErrorWindow from "./components/common/errorWindow";
import LoaderWindow from "./components/common/loadingWindow"

import Header from "./components/common/header";
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from './constans/ActionTypes';
import { withRouter } from 'react-router-dom';
import Routes from './components/common/routes';
import MainMenu from './components/common/mainMenu'
import RegistrationSuccess from './components/pages/registration/registrationSuccess';
import MessageQueue from "./components/common/messages/message"
import { translate } from 'react-i18next';
import LanguagePicker from './components/common/languagePicker';
import { getAuthUserData } from './actions/Account';

class App extends Component {
  
  componentWillMount = () => {
    let { i18n, app, onInit } = this.props;
    i18n.changeLanguage(app.currentLanguage);
    onInit();
  }

  componentWillReceiveProps = (newProps) => {
    let { i18n, app } = this.props;
    if(newProps.app.currentLanguage !== app.currentLanguage){
      i18n.changeLanguage(newProps.app.currentLanguage);
    }
  }

  render() {

    let {
      onCloseErrorWindow,
      app: {
        loadingWindow,
        authorizedUser
      },
      catcher: {
        errorWindow
      },
      register: {
        isSuccessWindowShow
      }


    } = this.props; 
    return (
      <div>
        <Header />
        <div className="main-wrapper-content">
          <MainMenu/>
          <MessageQueue />
          <Routes />
        </div>
        <ErrorWindow onClose={onCloseErrorWindow} open={errorWindow.isVisible} value={errorWindow.message} />
        <LoaderWindow open={loadingWindow.isVisible} value={loadingWindow.message} />
        <RegistrationSuccess open={isSuccessWindowShow} value="Value"/>
         { !authorizedUser ? <LanguagePicker /> : null }
     </div>
    );
  }
}


export default 
translate("translations")(
  withRouter(connect(
  state => ({
      app: state.app,
      catcher: state.catcher,
      register: state.register
  }),
  dispatch => ({
    onCloseErrorWindow: () => {
        dispatch({ type: ACTION_FOR_APP.CLOSE_ERROR_WINDOW})
    },
    onCloseMessageWindow: () => {
      dispatch({ type: ACTION_FOR_APP.CLOSE_MESSAGE_WINDOW})
    },
    onInit: () => {
      dispatch(getAuthUserData(false));
    }
  })
)(App)))
