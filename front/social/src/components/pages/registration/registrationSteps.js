import React from "react";
import RegistrationForm from "./registrationForm"
import RegistrationAvatar from "./registrationAvatar"
import RegistrationSuccess from "./registrationSuccess"
import { connect } from 'react-redux';
import {  Paper  } from '@material-ui/core'; 


class RegistrationStepper extends React.Component {
  
  render() {
    const registrationSteps = [
      {
        component: <RegistrationForm />
      },
      {
        component: <RegistrationAvatar />
      },
      {
        component: <RegistrationSuccess />
      }
    ];

    
    const { step } = this.props.register
    return (
      <div className="steps-wrapper"> 
        <Paper className="card">
          <div>
              {registrationSteps[step].component}
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(
  state => ({
      register: state.register
  })
)(RegistrationStepper);
