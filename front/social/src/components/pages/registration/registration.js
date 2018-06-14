import React, { Component } from 'react';

import RegistrationForm from './registrationForm'

import RegistrationSteps from './registrationSteps'

class Registration extends Component {
    render() {
    return (
      <div className="registration-page">
         <h1 className="pageHeader">Регистрация</h1>
         <RegistrationSteps />
      </div>

    );
    }
}

export default Registration