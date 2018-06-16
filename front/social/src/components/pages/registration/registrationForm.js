import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input  } from '@material-ui/core'; 

import {nameValidate, dateValidate, emailValidate, sexValidate} from "./validate"
import { connect } from 'react-redux';

import * as consts from '../../../constans/registration'
import * as actionTypes from '../../../constans/ActionTypes'


class RegistrationForm extends Component {

    constructor(props){
        super(props);
    }

    
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
    
    var validateState = {
        ...this.props.register.validateState
    }

    var state = {
        ...this.props.register
    }
    

    return (
        <div className="formWrapper">
        <h3 className="registrationFormHeader">Общая информация</h3>
        <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <TextField 
                                    label="Имя" 
                                    helperText={validateState.firstname.message}
                                    onChange={(e) => this.fieldCange(consts.MODEL_FIRSTNAME,e)}
                                    value={state.firstname}
                                    required
                                    error={validateState.firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Фамилия" 
                                    fullWidth
                                    helperText={validateState.surname.message}
                                    required
                                    value={state.surname}
                                    onChange={(e) => this.fieldCange(consts.MODEL_SURNAME,e)}
                                    error={validateState.surname.isError}
                                    />
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                      <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Отчество" 
                                    fullWidth
                                    value={state.parrentname}
                                    helperText={validateState.parrentname.message}
                                    onChange={(e) => this.fieldCange(consts.MODEL_PARRENTNAME,e)}
                                    error={validateState.parrentname.isError}
                                   
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           
                        </Grid>
                    </Grid>
                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            label="Почта" 
                            required
                            fullWidth
                            helperText={validateState.email.message}
                            required
                            onChange={(e) => this.fieldCange(consts.MODEL_EMAIL,e)}
                            error={validateState.email.isError}
                            value={state.email}
                            type="email"
                            
                        
                            />
                    </FormControl>

                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            required
                            fullWidth
                            type="date"

                            helperText={validateState.birthdate.message}
                            required
                            onChange={(e) => this.fieldCange(consts.MODEL_BIRTHDATE,e)}
                            error={validateState.birthdate.isError}
                            value={state.birthdate}
                            
                            inputProps= {{
                                min: consts.MIN_DATE,
                                max: consts.MAX_DATE
                            }}
                            />
                    </FormControl>
                   
                    <FormControl className="registerControl" fullWidth error={validateState.sex.isError} >
                        <Select 
                            required
                            value={state.sex}
                            displayEmpty
                            name='sex'
                            onChange={(e) => this.fieldCange(consts.MODEL_SEX,e)}
                            fullWidth
                             >

                            <MenuItem value="" disabled>Пол</MenuItem>
                            <MenuItem value={consts.MALE}>Мужской</MenuItem>
                            <MenuItem value={consts.FEMALE}>Женский</MenuItem>
                        </Select>
                        <FormHelperText>Укажите ваш пол</FormHelperText>
                    </FormControl>
                    <Grid container justify="flex-end">
                        <Button onClick={this.onSubmit} type="submit" variant="contained" color="primary">Далее</Button>
                    </Grid> 
            </form>
        </div>
    );
    }
}



export default connect(
        state => ({
            register: state.register
        }),
        dispatch => ({
            onSubmit: (model) => {
                dispatch({ type: actionTypes.ON_SUBMIT, payload: model})
            },
            onChange: (newValue) => {
                dispatch({ type: actionTypes.ON_CHANGE, payload: newValue})
            },
            onNext: (newValue) => {
                dispatch({ type: actionTypes.NEXT_STEP})
            }

        })
)(RegistrationForm);