import React from 'react'
import { Button } from "@material-ui/core"
import { connect } from 'react-redux'
import content from "../../../content/registration"

class RegistrationSuccess extends React.Component {

  render() {

    let {register} = this.props
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
