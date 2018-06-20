import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input, Typography  } from '@material-ui/core'; 

import {nameValidate, dateValidate, emailValidate, sexValidate} from "./validate"
import { connect } from 'react-redux';

import { MODEL_NAMES, DATE, SEX_TYPES, MESSAGE } from '../../../constans/registration'
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes'

import Content from "../../../content/registration"

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
    
    var { sex, email, firstname, surname, parrentname, birthdate } = this.props.register.validateState

    var state = {
        ...this.props.register
    }
    

    return (
        <div className="formWrapper">
        <Typography variant="title" color="inherit">
            Общая информация
        </Typography>
        <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <TextField 
                                    label={Content.NameLabel} 
                                    helperText={firstname.message}
                                    onChange={(e) => this.fieldCange(MODEL_NAMES.FIRSTNAME,e)}
                                    value={state.firstname}
                                    error={firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label={Content.SurameLabel}  
                                    fullWidth
                                    helperText={surname.message}
                                    value={state.surname}
                                    onChange={(e) => this.fieldCange(MODEL_NAMES.SURNAME,e)}
                                    error={surname.isError}
                                    />
                            </FormControl>
                        </Grid>
                    </Grid>
                    
                      <Grid className="registerControl" container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label={Content.ParrentnameLabel} 
                                    fullWidth
                                    value={state.parrentname}
                                    helperText={parrentname.message}
                                    onChange={(e) => this.fieldCange(MODEL_NAMES.PARRENTNAME,e)}
                                    error={parrentname.isError}
                                   
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           
                        </Grid>
                    </Grid>
                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            label={Content.EmailLabel}  
                            fullWidth
                            helperText={email.message}
                            onChange={(e) => this.fieldCange(MODEL_NAMES.EMAIL,e)}
                            error={email.isError}
                            value={state.email}
                            type="email"
                            />
                    </FormControl>

                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            required
                            fullWidth
                            type="date"

                            helperText={birthdate.message}
                            required
                            onChange={(e) => this.fieldCange(MODEL_NAMES.BIRTHDATE,e)}
                            error={birthdate.isError}
                            value={state.birthdate}
                            
                            inputProps= {{
                                min: DATE.MIN,
                                max: DATE.MAX
                            }}
                            />
                    </FormControl>
                   
                    <FormControl className="registerControl" fullWidth error={sex.isError} >
                        <Select 
                            required
                            value={state.sex}
                            displayEmpty
                            name='sex'
                            onChange={(e) => this.fieldCange(MODEL_NAMES.SEX,e)}
                            fullWidth
                             >

                            <MenuItem value="" disabled>{Content.SexLabel}</MenuItem>
                            <MenuItem value={SEX_TYPES.MALE}>{Content.Male}</MenuItem>
                            <MenuItem value={SEX_TYPES.FEMALE}>{Content.Female}</MenuItem>
                        </Select>
                        <FormHelperText>{sex.message}</FormHelperText>
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
                dispatch({ type: ACTION_FOR_REGISTRATION.ON_SUBMIT, payload: model})
            },
            onChange: (newValue) => {
                dispatch({ type: ACTION_FOR_REGISTRATION.ON_CHANGE, payload: newValue})
            },
            onNext: (newValue) => {
                dispatch({ type: ACTION_FOR_REGISTRATION.NEXT_STEP})
            }

        })
)(RegistrationForm);