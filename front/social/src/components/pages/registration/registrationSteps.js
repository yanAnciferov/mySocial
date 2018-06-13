import React from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./registrationForm"

import {  MobileStepper  } from '@material-ui/core'; 


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
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  render() {

    const registrationSteps = [
      {
        component: <RegistrationForm />
      },
      {
        component: <button>2</button>
      }
    ];

    
    const { activeStep } = this.state;

    const maxSteps = 0;

    return (
      <div>
          {registrationSteps[activeStep].component}
      </div>
    );
  }
}



export default RegistrationStepper;
