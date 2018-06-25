import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"


class ErrorWindow extends React.Component {

    handleClose= (event, value) => {
       this.props.onClose();
    };

    render() {
        const { value, ...other } = this.props;
    
        return (
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            {...other}
          >
            <DialogTitle>Ошибка</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {value}
                </DialogContentText>
          </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Ок
                </Button>
            </DialogActions>
          </Dialog>
        );
    }
}

export default ErrorWindow