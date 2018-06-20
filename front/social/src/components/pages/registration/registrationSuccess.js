import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Button } from "@material-ui/core"
import Slider from '@material-ui/lab/Slider'
import { connect } from 'react-redux'
import * as actionTypes from "../../../constans/ActionTypes"
import content from "../../../content/registration"
import { registration } from "../../../actions/Account"

class RegistrationSuccess extends React.Component {

  render() {

    let {register} = this.props

    var valid = this.props.register.validateState.image;
    var model = this.props.register.image.file;
    return (
      <div className="registration-result">
        <p>{content.MessageAboutSuccesRegistration(register.firstname)}</p>
        <p>{content.MessageAboutSendPassToMail(register.email)}</p>
        <p className="gotoprofile" >
            <Button variant="contained" color="primary">{content.GoToProfile}</Button>
        </p>
      </div>
    )
  }
}

export default connect(
    state => ({
        register: state.register
    })
)(RegistrationSuccess);
