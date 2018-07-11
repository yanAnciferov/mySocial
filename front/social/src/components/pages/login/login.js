import React, { Component } from 'react';
import content from "../../../content/login"
import LoginForm from "./loginForm";
import { translate } from 'react-i18next';

class Login extends Component {
    render() {
    let { t } = this.props;
    return (
      <div className="login-page">
         <h1 className="pageHeader">{t(content.LoginPageHeader)}</h1>
         <div className="card papper">
          <LoginForm />
         </div>
      </div>

    );
    }
}

export default translate("translations")(Login)