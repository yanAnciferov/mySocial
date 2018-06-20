import React, { Component } from 'react';
import content from "../../../content/login"
import LoginForm from "./loginForm"
import { Paper } from "@material-ui/core"

class Login extends Component {
    render() {
    return (
      <div className="login-page">
         <h1 className="pageHeader">{content.LoginPageHeader}</h1>
         <Paper className="card">
          <LoginForm />
         </Paper>
      </div>

    );
    }
}

export default Login