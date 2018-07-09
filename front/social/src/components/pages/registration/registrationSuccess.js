import React from 'react'
import { connect } from 'react-redux'
import content from "../../../content/registration"
import commonContent from "../../../content/common"
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes';
import translate from 'react-i18next/dist/commonjs/translate';

class RegistrationSuccess extends React.Component {

  render() {

    const { app: {authorizedUser}, open, onClose, t } = this.props;
    if(authorizedUser)
      return (
        <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        open={open}
      >
          <DialogTitle>{t(content.FinalRegistration)}</DialogTitle>
          <DialogContent>
              <DialogContentText>
                  {t(content.MessageAboutSuccesRegistration, { name: authorizedUser.firstname})}
              </DialogContentText>
              <DialogContentText>
                  {t(content.MessageAboutSendPassToMail, { email: authorizedUser.email})}
              </DialogContentText>
        </DialogContent>
          <DialogActions>
              <Button onClick={onClose} variant="contained" color="primary">
                {t(commonContent.Ok)}
              </Button>
          </DialogActions>
        </Dialog>
      )
    return ""
  }
}


export default translate("translations")(connect(
  state => ({
      app: state.app,
      register: state.register
  }),
  dispatch => ({
      onClose: (model) => {
          dispatch({ type: ACTION_FOR_REGISTRATION.ON_SUCCESS_CLOSE })
      }

  })
)(RegistrationSuccess)); 
