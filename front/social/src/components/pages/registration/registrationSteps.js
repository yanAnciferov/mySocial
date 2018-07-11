import React from "react";
import RegistrationForm from "./registrationForm"
import RegistrationAvatar from "./registrationAvatar"
import { connect } from 'react-redux';


class RegistrationStepper extends React.Component {
  
  render() {
    const registrationSteps = [
      {
        component: <RegistrationForm />
      },
      {
        component: <RegistrationAvatar />
      }
    ];

    
    const { step } = this.props.register
    return (
      <div className="steps-wrapper"> 
        <div className="card papper">
          <div>
              {registrationSteps[step].component}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
      register: state.register
  })
)(RegistrationStepper);
