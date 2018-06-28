import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText} from "@material-ui/core"
import Content from "../../content/common"

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
            <DialogTitle>{Content.Error}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {value}
                </DialogContentText>
          </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    {Content.OK}
                </Button>
            </DialogActions>
          </Dialog>
        );
    }
}

export default ErrorWindow