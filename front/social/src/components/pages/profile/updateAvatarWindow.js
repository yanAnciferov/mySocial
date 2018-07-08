
import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@material-ui/core"
import Content from "../../../content/common"
import AvatarPicker from "../../common/avatarPicker"
import { connect } from 'react-redux';
import { ACTION_FOR_EDIT } from '../../../constans/ActionTypes';
import { updateAvatar } from '../../../actions/Account';
import { PROFILE_CONTENT } from "../../../content/profile"
import translate from 'react-i18next/dist/commonjs/translate';
class UpdateAvatarWindow extends React.Component {

    handleClose= (event, value) => {
       this.props.onClose();
    };

    render() {
        const { value, avatar, onClose, onSubmit, onImageLoad, onRectChange, t, ...other } = this.props;
    
        return (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            {...other}
            maxWidth={false}
          >
            <DialogTitle>{t(PROFILE_CONTENT.PICK_AVATAR)}</DialogTitle>
            <DialogContent className="avatar-load-window">
                <AvatarPicker onRectChange={onRectChange} t={t} onImageLoad={onImageLoad} {...avatar} />
          </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {t(Content.Cancel)}
                </Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {t(Content.Ok)}
                </Button>
            </DialogActions>
          </Dialog>
        );
    }
}

export default translate("translations")(connect(
    state => ({
        avatar: state.avatar
    }),
    dispatch => ({
        onImageLoad: (newValue) => {
            dispatch({ type: ACTION_FOR_EDIT.ON_IMAGE_LOAD_TO_EDIT, payload: newValue})
        },
        onRectChange: (rect) => {
            dispatch({ type: ACTION_FOR_EDIT.ON_IMAGE_RECT_CHANGE_TO_EDIT, payload: rect})
        },
        onSubmit: (value) => {
            dispatch({ type: ACTION_FOR_EDIT.ON_IMAGE_SUBMIT, payload: value})
            dispatch(updateAvatar());
        }
    })
)(UpdateAvatarWindow))