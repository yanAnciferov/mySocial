import React, { Component } from 'react';

import {  FormControl, Button, TextField, Grid } from '@material-ui/core'; 
import { connect } from 'react-redux';

import { MODEL_NAMES } from '../../../constans/registration'
import { ACTION_FOR_LOGIN } from '../../../constans/ActionTypes'

import Content from "../../../content/login"
import { login } from "../../../actions/Account"
import translate from 'react-i18next/dist/commonjs/translate';

class LoginForm extends Component {
    
    fieldCange = (type, event) => {
        this.props.onChange({
            name: type,
            value: event.target.value
        });
    }


    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit();
    }


    render() {
    
    let { email, password } = this.props.login.validateState
    let { t } = this.props;
    let state = {
        ...this.props.login
    }
    

    return (
        <div className="formWrapper">
        <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <FormControl className="registerControl" required fullWidth>
                            <TextField 
                                label={t(Content.EmailLabel)} 
                                helperText={t(email.message)}
                                onChange={(e) => this.fieldCange(MODEL_NAMES.EMAIL,e)}
                                value={state.email}
                                error={email.isError}
                                />
                        </FormControl>
                        <FormControl className="registerControl" fullWidth>
                            <TextField 
                                type="password"
                                label={t(Content.PasswordLabel)}  
                                fullWidth
                                helperText={t(password.message)}
                                value={state.password}
                                onChange={(e) => this.fieldCange(MODEL_NAMES.PASSWORD,e)}
                                error={password.isError}
                                />
                        </FormControl>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button className="login-button" onClick={this.onSubmit} type="submit" variant="contained" color="primary">{t(Content.LoginPageHeader)}</Button>
                    </Grid> 
            </form>
        </div>
    );
    }
}



export default translate("translations")(connect(
        state => ({
            login: state.login
        }),
        dispatch => ({
            onSubmit: (model) => {
                dispatch({ type: ACTION_FOR_LOGIN.LOGIN_SUBMIT, payload: model})
                dispatch(login());
            },
            onChange: (newValue) => {
                dispatch({ type: ACTION_FOR_LOGIN.LOGIN_ON_CHANGE, payload: newValue})
            }
        })
)(LoginForm));