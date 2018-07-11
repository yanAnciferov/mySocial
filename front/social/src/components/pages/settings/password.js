import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { PASSWORD_FIELDS, PASSWORD_MESSAGES } from '../../../constans/registration';
import { SETTINGS } from '../../../content/settings';

class Password extends Component {

    render() { 
        let {
            fieldChange, 
            onSubmit,
            t,
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
            <div className="settings-element papper">
                <div className="papper-header">{t(SETTINGS.CHANGE_PASSWORD_SUBMIT)}</div>
                <div className="settings-element-content">
                {state.isSuccess &&
                   <div className="success">{t(SETTINGS.CHANGE_PASSWORD_SUCCES)}</div>
                }
                <form onSubmit={onSubmit}>
                    <FormControl className="settings-password-field">
                        <TextField
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.OLD_PASSWORD,e)}
                            value={state.oldPassword}
                            type="password" 
                            label={t(PASSWORD_MESSAGES.ENTER_OLD_PASSWORD)}
                            error={oldPassword.isError}
                            helperText={t(oldPassword.message)}/>
                    </FormControl>
                    <FormControl className="settings-password-field">
                        <TextField
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.NEW_PASSWORD,e)}
                            value={state.newPassword}
                            type="password" 
                            label={t(PASSWORD_MESSAGES.ENTER_NEW_PASSWORD)}
                            error={newPassword.isError}
                            helperText={t(newPassword.message)}/>
                    </FormControl>
                    <FormControl className="settings-password-field">
                        <TextField 
                            value={state.confirmPassword}
                            onChange={(e) => fieldChange(PASSWORD_FIELDS.CONFIRM_PASSWORD,e)}
                            type="password" 
                            label={t(PASSWORD_MESSAGES.ENTER_CONFIRM_PASSWORD)}
                            error={confirmPassword.isError}
                            helperText={t(confirmPassword.message)}/>
                    </FormControl>                    
                    <Button 
                        type="submit" 
                        className="settings-submit" 
                        variant="contained" 
                        color="primary">{t(SETTINGS.CHANGE_PASSWORD_TITTLE)}</Button>
                </form>
                </div>
                
            </div>
      );
    }
}




export default Password;