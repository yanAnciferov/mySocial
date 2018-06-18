import React from 'react'
import { Dialog, DialogContentText, LinearProgress, DialogTitle, DialogContent, DialogActions, Button} from "@material-ui/core"


class ErrorWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state.value = this.props.value;
    }

    handleClose= (event, value) => {
       this.props.onClose();
    };

    state = {};

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