import React, { Component } from 'react';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input, Typography  } from '@material-ui/core'; 

import { emailValidate } from "../../../scripts/validate"
import { connect } from 'react-redux';

import { MODEL_NAMES, DATE, SEX_TYPES, MESSAGE } from '../../../constans/registration'
import { ACTION_FOR_REGISTRATION, ACTION_FOR_LOGIN } from '../../../constans/ActionTypes'

import Content from "../../../content/login"
import { login } from "../../../actions/Account"
import { push } from 'react-router-redux/actions';

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
    
    var { email, password } = this.props.login.validateState

    var state = {
        ...this.props.login
    }
    

    return (
        <div className="formWrapper">
        <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <FormControl className="registerControl" required fullWidth>
                            <TextField 
                                label={Content.EmailLabel} 
                                helperText={email.message}
                                onChange={(e) => this.fieldCange(MODEL_NAMES.EMAIL,e)}
                                value={state.email}
                                error={email.isError}
                                />
                        </FormControl>
                        <FormControl className="registerControl" fullWidth>
                            <TextField 
                                type="password"
                                label={Content.PasswordLabel}  
                                fullWidth
                                helperText={password.message}
                                value={state.password}
                                onChange={(e) => this.fieldCange(MODEL_NAMES.PASSWORD,e)}
                                error={password.isError}
                                />
                        </FormControl>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button className="login-button" onClick={this.onSubmit} type="submit" variant="contained" color="primary">Далее</Button>
                    </Grid> 
            </form>
        </div>
    );
    }
}



export default connect(
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
)(LoginForm);