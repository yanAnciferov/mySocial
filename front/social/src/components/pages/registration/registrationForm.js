import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input  } from '@material-ui/core'; 

import {nameValidate, dateValidate, emailValidate, sexValidate} from "./validate"
import { connect } from 'react-redux';


const MALE = "male";
const FEMALE = "female";

class RegistrationForm extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            sex: ""
        }
    }

    
    sexChange = event => {
        this.setState({sex: event.target.value });
    }
     

    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({
            firstname: this.firstname.value,
            surname: this.surname.value,
            parrentname: this.parrentname.value,
            email: this.email.value,
            date: this.date.value,
            sex: this.state.sex
        });
    }


    render() {
    
    
    return (
        <div className="wrapper">
        <form onSubmit={this.onSubmit}>
                <Paper className="card">
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <TextField 
                                    label="Имя" 
                                    helperText={this.props.register.validateState.firstname.message}
                                    inputRef={(input) => { this.firstname = input } }
                                    required
                                    error={this.props.register.validateState.firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Фамилия" 
                                    fullWidth
                                    helperText={this.props.register.validateState.surname.message}
                                    required
                                    inputRef={(input) => { this.surname = input } }
                                    error={this.props.register.validateState.surname.isError}
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
                                    helperText={this.props.register.validateState.parrentname.message}
                                    inputRef={(input) => { this.parrentname = input } }
                                    error={this.props.register.validateState.parrentname.isError}
                                   
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
                            helperText={this.props.register.validateState.email.message}
                            required
                            inputRef={(input) => { this.email = input } }
                            error={this.props.register.validateState.email.isError}
                            type="email"
                            
                        
                            />
                    </FormControl>

                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            required
                            fullWidth
                            type="date"

                            helperText={this.props.register.validateState.date.message}
                            required
                            inputRef={(input) => { this.date = input } }
                            error={this.props.register.validateState.date.isError}
                            
                            inputProps= {{
                                min:"1920-00-01",
                                max:"2017-12-31"
                            }}
                            />
                    </FormControl>
                   
                    <FormControl className="registerControl" fullWidth error={this.props.register.validateState.sex.isError} >
                        <Select 
                            required
                            value={this.state.sex}
                            displayEmpty
                            name='sex'
                            onChange={this.sexChange}
                            fullWidth
                             >

                            <MenuItem value="" disabled>Пол</MenuItem>
                            <MenuItem value={MALE}>Мужской</MenuItem>
                            <MenuItem value={FEMALE}>Женский</MenuItem>
                        </Select>
                        <FormHelperText>Укажите ваш пол</FormHelperText>
                    </FormControl>
                    <Grid container justify="flex-end">
                        <Button onClick={this.onSubmit} type="submit" variant="contained" color="primary">Далее</Button>
                    </Grid> 
                </Paper>
            </form>
        </div>
    );
    }
}



export default connect(
        state => ({
            register: state.registerModel
        }),
        dispatch => ({
            onSubmit: (model) => {
                dispatch({ type: 'ON_SUBMIT', payload: model})
            },
            onChange: (name) => {
                dispatch({ type: 'ON_CHANGE', payload: name})
            }
        })
)(RegistrationForm);