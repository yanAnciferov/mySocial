
import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent } from "@material-ui/core"
import Content from "../../../content/common"
import AvatarPicker from "../../common/avatarPicker"
import { connect } from 'react-redux';
import { ACTION_FOR_EDIT } from '../../../constans/ActionTypes';
import { updateAvatar } from '../../../actions/Account';
import { PROFILE_CONTENT } from "../../../content/profile"
class UpdateAvatarWindow extends React.Component {

    handleClose= (event, value) => {
       this.props.onClose();
    };

    render() {
        const { value, avatar, onClose, onSubmit, onImageLoad, onRectChange, ...other } = this.props;
    
        return (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            {...other}
            maxWidth={false}
          >
            <DialogTitle>{PROFILE_CONTENT.PICK_AVATAR}</DialogTitle>
            <DialogContent className="avatar-load-window">
                <AvatarPicker onRectChange={onRectChange} onImageLoad={onImageLoad} {...avatar} />
          </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {Content.Cancel}
                </Button>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {Content.OK}
                </Button>
            </DialogActions>
          </Dialog>
        );
    }
}

export default connect(
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
)(UpdateAvatarWindow)