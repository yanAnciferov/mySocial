import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button} from "@material-ui/core"


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
            <DialogTitle>{value}</DialogTitle>
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