import React, { Component } from 'react';
import RegistrationSteps from './registrationSteps'
import content from "../../../content/registration"

class Registration extends Component {
    render() {
    return (
      <div className="registration-page">
         <h1 className="pageHeader">{content.RegistrationPageHeader}</h1>
         <RegistrationSteps />
      </div>

    );
    }
}

export default Registration