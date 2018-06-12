import React, { Component } from 'react';

import RegistrationForm from './registrationForm'

import { CardHeader } from '@material-ui/core'; 


class Registration extends Component {
    render() {
    return (
      <div>
         <h1 className="pageHeader">Регистрация</h1>
         <RegistrationForm />
      </div>

    );
    }
}

export default Registration