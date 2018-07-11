import React from 'react'
import { Dialog, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"
import Content from "../../content/common"
import { connect } from 'react-redux';
import { ACTION_FOR_MESSAGEBOX } from '../../constans/ActionTypes';
import translate from 'react-i18next/dist/commonjs/translate';

class MessageBox extends React.Component {

    handleOk = () => {
        const { messageBox: { okDelegate }, onClose } = this.props;   
        okDelegate();
        onClose();
    }

    handleCancle = () => {
        const { messageBox: { cancelDelegate }, onClose } = this.props;
        cancelDelegate();
        onClose();
    }

    render() {
        const { t, messageBox: { isVisible, message } } = this.props;
    
        return (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={isVisible}
            
          >
            <DialogContent>
                <DialogContentText>
                    {t(message)}
                </DialogContentText>
          </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCancle} color="primary">
                    {t(Content.Cancel)}
                </Button>
                <Button onClick={this.handleOk} color="primary">
                    {t(Content.Ok)}
                </Button>
            </DialogActions>
          </Dialog>
        );
    }
}

export default  translate("translations")(connect(
    state => ({
        messageBox: state.messageBox
    }),
    dispatch => ({
    onClose: () => {
        dispatch({ type: ACTION_FOR_MESSAGEBOX.MESSAGEBOX_CLOSE})
    }
    })
)(MessageBox))