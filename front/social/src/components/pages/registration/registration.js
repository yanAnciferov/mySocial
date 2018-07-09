import React, { Component } from 'react';
import RegistrationSteps from './registrationSteps'
import content from "../../../content/registration"
import translate from 'react-i18next/dist/commonjs/translate';

class Registration extends Component {
    render() {
      let { t } = this.props; 
    return (
      <div className="registration-page">
         <h1 className="pageHeader">{t(content.RegistrationPageHeader)}</h1>
         <RegistrationSteps />
      </div>

    );
    }
}

export default translate("translations")(Registration)