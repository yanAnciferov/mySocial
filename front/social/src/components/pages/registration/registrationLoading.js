import React from 'react'
import { Dialog, DialogContentText, LinearProgress, DialogTitle, DialogContent} from "@material-ui/core"


class LoaderWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state.value = this.props.value;
    }

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
            <DialogTitle>Подождите, идет процесс регистрации..</DialogTitle>
            <DialogContent>
                <LinearProgress />
            </DialogContent>
          </Dialog>
        );
    }
}

export default LoaderWindow