import React from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./registrationForm"
import RegistrationAvatar from "./registrationAvatar"
import RegistrationSuccess from "./registrationSuccess"
import LoaderWindow from "./registrationLoading"
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
  
  handleClose = () => {
    
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
    const {onCloseErrorWindow} = this.props;
    const { step, isLoading, errorWindow } = this.props.register
    return (
      <div className="steps-wrapper"> 
        <Paper className="card">
          <div>
              {registrationSteps[step].component}
          </div>
        </Paper>
        <LoaderWindow open={isLoading} />
        <ErrorWindow onClose={onCloseErrorWindow} open={errorWindow.isVisible} value={errorWindow.message} />
      </div>
    );
  }
}

export default connect(
  state => ({
      register: state.register
  }),
  dispatch => ({
    onCloseErrorWindow: () => {
        dispatch({ type: actionTypes.CLOSE_ERROR_WINDOW})
    }
  })
)(RegistrationStepper);
