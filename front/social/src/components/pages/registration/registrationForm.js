import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input, Typography  } from '@material-ui/core'; 

import {nameValidate, dateValidate, emailValidate, sexValidate} from "./validate"
import { connect } from 'react-redux';

import { MODEL_NAMES, DATE, SEX_TYPES, MESSAGE } from '../../../constans/registration'
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
                                    label="Имя" 
                                    helperText={firstname.message}
                                    onChange={(e) => this.fieldCange(MODEL_NAMES.FIRSTNAME,e)}
                                    value={state.firstname}
                                    required
                                    error={firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Фамилия" 
                                    fullWidth
                                    helperText={surname.message}
                                    required
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
                                    label="Отчество" 
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
                            label="Почта" 
                            required
                            fullWidth
                            helperText={email.message}
                            required
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

                            <MenuItem value="" disabled>Пол</MenuItem>
                            <MenuItem value={SEX_TYPES.MALE}>Мужской</MenuItem>
                            <MenuItem value={SEX_TYPES.FEMALE}>Женский</MenuItem>
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