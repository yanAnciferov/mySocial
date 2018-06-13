import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input  } from '@material-ui/core'; 

import {nameValidate, dateValidate, emailValidate, sexValidate} from "./validate"


const MALE = "male";
const FEMALE = "female";

class RegistrationForm extends Component {


    constructor(props){
        super(props);
    

        this.state = {

            firstname: "",
            surname: "",
            parrentname: "",
            email: "",
            date: Date.now(),
            sex: "",

            validateState: {
                firstname: {
                    isError: false,
                    message: "Укажите ваше имя"
                },
                surname: {
                    isError: false,
                    message: "Укажите вашу фамилию"
                },
                parrentname: {
                    isError: false,
                    message: "Укажите ваше отчество"
                },
                email: {
                    isError: false,
                    message: "Укажите вашу почту"
                },
                date: {
                    isError: false,
                    message: "Укажите вашу дату рождения"
                },
                sex: {
                    isError: false,
                    message: "Укажите ваш пол"
                }
            }
        } 
    }

    
    

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    sexChange = event => {
        this.setState(prev => ({
           ...prev,
           sex: event.target.value
        }))
    } 

    onSubmit = event => {
        event.preventDefault();

        var newValidateState = {
            firstname: nameValidate(this.state.firstname,true, "firstname"),
            surname: nameValidate(this.state.surname,true, "surname"),
            parrentname: nameValidate(this.state.parrentname,false, "parrentname"),
            email: emailValidate(this.state.email),
            date: dateValidate(this.state.date),
            sex: sexValidate(this.state.sex)
        }

        this.setState(prevState => ({
            ...prevState,
            validateState: newValidateState
        }))

        var isFormValid = true;

        for(var field in newValidateState )
        {
            isFormValid = isFormValid && !newValidateState[field].isError
        }
        console.log(isFormValid);
    }


    render() {
    
    const { classes } = this.props;
    
    return (
        <div className="wrapper">
        <form onSubmit={this.onSubmit}>
                <Paper className="card">
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <TextField 
                                    label="Имя" 
                                    helperText={this.state.validateState.surname.message}
                                    value={this.state.firstname}
                                    onChange={this.handleChange('firstname')}
                                    required
                                    error={this.state.validateState.firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Фамилия" 
                                    fullWidth
                                    helperText={this.state.validateState.surname.message}
                                    required
                                    value={this.state.surname.value}
                                    onChange={this.handleChange('surname')}
                                    error={this.state.validateState.surname.isError}
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
                                    helperText={this.state.validateState.parrentname.message}
                                    value={this.state.parrentname}
                                    onChange={this.handleChange('parrentname')}
                                    error={this.state.validateState.parrentname.isError}
                                   
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
                            helperText={this.state.validateState.email.message}
                            value={this.state.email.value}
                            onChange={this.handleChange('email')}
                            type="email"
                            error={this.state.validateState.email.isError}
                            
                        
                            />
                    </FormControl>

                    
                    <FormControl className="registerControl" fullWidth>
                        <TextField 
                            label="Дата рождения" 
                            required
                            fullWidth
                            helperText={this.state.validateState.date.message}
                            value={this.state.date}
                            onChange={this.handleChange('date')}
                            type="date"
                            error={this.state.validateState.date.isError}
                            inputProps= {{
                                min:"1920-00-01",
                                 max:"2017-12-31"
                            }}
                            />
                    </FormControl>
                   
                    <FormControl className="registerControl" fullWidth error={this.state.validateState.sex.isError} >
                        <Select 
                            required
                            value={this.state.sex}
                            onChange={this.sexChange}
                            displayEmpty
                            name='sex'
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

RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default RegistrationForm;