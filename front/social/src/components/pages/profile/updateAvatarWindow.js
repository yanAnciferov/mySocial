
import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"
import Content from "../../../content/common"
import AvatarPicker from "../../common/avatarPicker"
import { connect } from 'react-redux';
import { ACTION_FOR_EDIT } from '../../../constans/ActionTypes';

class UpdateAvatarWindow extends React.Component {

    handleClose= (event, value) => {
       this.props.onClose();
    };

    render() {
        const { value, avatar, onClose, onImageLoad, ...other } = this.props;
    
        return (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            {...other}
          >
            <DialogTitle>Выбор аватара</DialogTitle>
            <DialogContent className="avatar-load-window">
                <AvatarPicker onImageLoad={onImageLoad} source={avatar} />
          </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {Content.Cancel}
                </Button>
                <Button variant="contained" color="primary">
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
        }
    })
)(UpdateAvatarWindow)