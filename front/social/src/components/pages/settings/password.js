import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { MODEL_NAMES, PASSWORD_FIELDS, PASSWORD_MESSAGES } from '../../../constans/registration';
import { SETTINGS } from '../../../content/settings';

class Password extends Component {

    render() { 
        let {
            fieldChange, 
            onSubmit,
            validateState: {
                oldPassword,
                newPassword,
                confirmPassword
            }
        } = this.props;

        let state = {
            ...this.props
        }
        return (       
            <Paper className="settings-element">
                <div className="papper-header">{SETTINGS.CHANGE_PASSWORD_TITTLE}</div>
                <div className="settings-element-content">
                {state.isSuccess &&
                   <div className="success">{SETTINGS.CHANGE_PASSWORD_SUCCES}</div>
                }
                <form onSubmit={onSubmit}>
                    <FormControl className="settings-password-field">
                        <TextField
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.OLD_PASSWORD,e)}
                            value={state.oldPassword}
                            type="password" 
                            label={PASSWORD_MESSAGES.ENTER_OLD_PASSWORD}
                            error={oldPassword.isError}
                            helperText={oldPassword.message}/>
                    </FormControl>
                    <FormControl className="settings-password-field">
                        <TextField
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.NEW_PASSWORD,e)}
                            value={state.newPassword}
                            type="password" 
                            label={PASSWORD_MESSAGES.ENTER_NEW_PASSWORD}
                            error={newPassword.isError}
                            helperText={newPassword.message}/>
                    </FormControl>
                    <FormControl className="settings-password-field">
                        <TextField 
                            value={state.confirmPassword}
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.CONFIRM_PASSWORD,e)}
                            type="password" 
                            label={PASSWORD_MESSAGES.ENTER_CONFIRM_PASSWORD}
                            error={confirmPassword.isError}
                            helperText={confirmPassword.message}/>
                    </FormControl>                    
                    <Button type="submit" className="settings-submit" variant="contained" color="primary">{SETTINGS.CHANGE_PASSWORD_SUBMIT}</Button>
                </form>
                </div>
                
            </Paper>
      );
    }
}




export default Password;