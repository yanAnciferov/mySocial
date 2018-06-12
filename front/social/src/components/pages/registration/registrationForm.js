import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Paper, Input  } from '@material-ui/core'; 



const styles = theme => ({
    card: {
      padding: "1em"
    },

    wrapper: {
        maxWidth: 600,
        margin: "0 auto"
    },

    registerControl: {
        "margin-bottom": "2em"
    }

});


class RegistrationForm extends Component {

    state = { 
      
        firstname: {
            value: "",
            isError: false,
            conditions() {
                return /^[a-zA-Z]{2,32}$/.test(this.value);
            }
        },
        surname: {
            value: "",
            isError: false,
            conditions() {
                return /^[a-zA-Z]{2,32}$/.test(this.value);
            }
        },
        fathername: {
            value: "",
            isError: false,
            conditions() {
                return /^[a-zA-Z]{2,32}$/.test(this.value);
            }
        },
        email: {
            value: "",
            isError: false,
            conditions() {
                return false;
            }
        },
        sex: {
            value: "",
            isError: false,
            conditions() {
                return this.value == "male" || this.value == 'female';
            }
        },
        date: {
            value: Date.now(),
            isError: false,
            conditions() {
                return false;
            }
        }       
    };


    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    sexChange = event => {
        this.setState(prev => ({
            sex:{
                ...prev.sex,
                value: event.target.value
            }
        }))
    } 

    onSubmit = event => {
        event.preventDefault();
    
    }

    render() {
    
    const { classes } = this.props;
    
    return (
        <div className={classes.wrapper}>
        <form onSubmit={this.onSubmit}>
                <Paper className={classes.card}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl required fullWidth>
                                <TextField 
                                    
                                    label="Имя" 
                                    helperText="Укажите ваше имя"
                                    value={this.state.firstname.value}
                                    onChange={this.handleChange('firstname')}
                                    required
                                    id="nameForm"
                                    error={this.state.firstname.isError}
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <TextField 
                                    label="Фамилия" 
                                    fullWidth
                                    helperText="Укажите вашу фамилию"
                                    required
                                    value={this.state.surname.value}
                                    onChange={this.handleChange('surname')}
                                    InputProps={
                                        { 
                                            inputProps: { maxLength: 32, minLength: 2 } 
                                        }
                                    }
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
                                    helperText="Укажите ваше отчество"
                                    value={this.state.fathername.value}
                                    onChange={this.handleChange('fathername')}
                                    InputProps={
                                        { 
                                            inputProps: { pattern: "^[a-zA-Z]+$" } 
                                        }
                                    }
                                    />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           
                        </Grid>
                    </Grid>
                    
                    <FormControl className={classes.registerControl} fullWidth>
                        <TextField 
                            label="Почта" 
                            required
                            fullWidth
                            helperText="Укажите ваш email"
                            value={this.state.email.value}
                            onChange={this.handleChange('email')}
                            type="email"
                            
                        
                            />
                    </FormControl>

                    
                    <FormControl className={classes.registerControl} fullWidth>
                        <TextField 
                            label="Дата рождения" 
                            required
                            fullWidth
                            helperText="Укажите вашу дату рождения"
                            value={this.state.date.value}
                            onChange={this.handleChange('date')}
                            type="date"
                            />
                    </FormControl>
                    
                    
                    
                   
                   
                    <FormControl className={classes.registerControl} fullWidth>
                        <Select 
                            required
                            value={this.state.sex.value}
                            onChange={this.sexChange}
                            displayEmpty
                            name='sex'
                            fullWidth
                             >

                            <MenuItem value="" disabled>Пол</MenuItem>
                            <MenuItem value={"male"}>Мужской</MenuItem>
                            <MenuItem value={"female"}>Женский</MenuItem>
                        </Select>
                        <FormHelperText>Укажите ваш пол</FormHelperText>
                    </FormControl>
                    <Grid container justify="center">
                        <Button onClick={this.onSubmit} type="submit" variant="contained" color="primary">Регистрация</Button>
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

export default withStyles(styles)(RegistrationForm);