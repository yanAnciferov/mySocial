import React from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./registrationForm"
import RegistrationAvatar from "./registrationAvatar"
import LoaderWindow from "./registrationLoading"
import { connect } from 'react-redux';

import {  Paper  } from '@material-ui/core'; 


const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  }
});

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

    const activeStep = this.props.step;
    
    return (
      <div className="steps-wrapper"> 
        <Paper className="card">
          <div>
              {registrationSteps[activeStep].component}
          </div>
        </Paper>
        <LoaderWindow open={this.props.isLoading} />
      </div>
    );
  }
}

export default connect(
  state => ({
      step: state.register.step,
      isLoading: state.register.isLoading
  })
)(RegistrationStepper);
