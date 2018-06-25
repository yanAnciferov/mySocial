import React from 'react'
import { connect } from 'react-redux'
import content from "../../../content/registration"
import commonContent from "../../../content/common"
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes';

class RegistrationSuccess extends React.Component {

  render() {

    const { app: {authorizedUser}, open, onClose } = this.props;
    if(authorizedUser)
      return (
        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        open={open}
      >
          <DialogTitle>{content.FinalRegistration}</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  {content.MessageAboutSuccesRegistration(authorizedUser.firstname)}
              </DialogContentText>
              <DialogContentText>
                  {content.MessageAboutSendPassToMail(authorizedUser.email)}
              </DialogContentText>
        </DialogContent>
          <DialogActions>
              <Button onClick={onClose} color="primary">
                {commonContent.OK}
              </Button>
          </DialogActions>
        </Dialog>
      )
    return ""
  }
}


export default connect(
  state => ({
      app: state.app,
      register: state.register
  }),
  dispatch => ({
      onClose: (model) => {
          dispatch({ type: ACTION_FOR_REGISTRATION.ON_SUCCESS_CLOSE })
      }

  })
)(RegistrationSuccess); 
