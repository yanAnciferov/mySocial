import React from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./registrationForm"
import RegistrationAvatar from "./registrationAvatar"
import RegistrationSuccess from "./registrationSuccess"
import ErrorWindow from "../../common/errorWindow"
import { connect } from 'react-redux';
import * as actionTypes from "../../../constans/ActionTypes"
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
  
  constructor(props){
    super(props);
  }
  

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
