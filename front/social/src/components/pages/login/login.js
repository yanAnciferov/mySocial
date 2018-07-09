import React, { Component } from 'react';
import content from "../../../content/login"
import LoginForm from "./loginForm"
import { Paper } from "@material-ui/core"
import { translate } from 'react-i18next';

class Login extends Component {
    render() {
    let { t } = this.props;
    return (
      <div className="login-page">
         <h1 className="pageHeader">{t(content.LoginPageHeader)}</h1>
         <Paper className="card">
          <LoginForm />
         </Paper>
      </div>

    );
    }
}

export default translate("translations")(Login)