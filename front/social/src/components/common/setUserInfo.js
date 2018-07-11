import React, { Component } from 'react';
import Content from "../../content/registration"
import { MODEL_NAMES, DATE } from '../../constans/registration';
import PropTypes from 'prop-types';
import { Button, Grid  } from '@material-ui/core'; 
import TextFormControl from './textFormControl';
import SelectGenderControl from './selectGender'

class SetUserInfo extends Component {
    
    render() {

        let { 
            validateState,
            validateState: { sex, email, firstname, surname, parrentname, birthdate },
            onSubmit, fieldChange, buttonText, t
        } = this.props;

        let state = {
            ...this.props
        }
        console.log(validateState);
        return (
        <form>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                <TextFormControl
                    value={state.firstname}
                    label={t(Content.NameLabel)} 
                    message={t(firstname.message)} 
                    onChange={(e) => fieldChange(MODEL_NAMES.FIRSTNAME,e)} 
                    isError={firstname.isError} 
                    fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFormControl
                        value={state.surname}
                        label={t(Content.SurameLabel)} 
                        message={t(surname.message)} 
                        onChange={(e) => fieldChange(MODEL_NAMES.SURNAME,e)} 
                        isError={surname.isError} 
                        fullWidth/>
                </Grid>
            </Grid>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                <TextFormControl
                        value={state.parrentname}
                        label={t(Content.ParrentnameLabel)} 
                        message={t(parrentname.message)} 
                        onChange={(e) => fieldChange(MODEL_NAMES.PARRENTNAME,e)} 
                        isError={parrentname.isError} 
                        fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    
                </Grid>
            </Grid>
            <Grid  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <TextFormControl 
                    value={state.email}
                    label={t(Content.EmailLabel)} 
                    message={t(email.message)} 
                    onChange={(e) => fieldChange(MODEL_NAMES.EMAIL,e)} 
                    isError={email.isError} 
                    fullWidth/>
                </Grid>
            </Grid>
            <Grid className="grid-row"  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <TextFormControl
                    value={state.birthdate}
                    message={t(birthdate.message)} 
                    onChange={(e) => fieldChange(MODEL_NAMES.BIRTHDATE,e)} 
                    isError={birthdate.isError} 
                    fullWidth
                    type="date"
                    inputProps= {{
                        min: DATE.MIN,
                        max: DATE.MAX
                    }}/>
                </Grid>
            </Grid>
                
            <Grid className="grid-row"  container spacing={24}>
                <Grid item xs={12} sm={12}>
                <SelectGenderControl 
                isError={sex.isError} 
                value={state.sex} 
                t={t}
                fieldCange={(e) => fieldChange(MODEL_NAMES.SEX,e)} 
                message={t(sex.message)} />

                </Grid>
            </Grid>
                
            
            <Grid container justify="flex-end">
                <Button onClick={onSubmit} type="submit" variant="contained" color="primary">{t(buttonText)}</Button>
            </Grid> 
        </form>
        )
    }
}

var shapeForValidationField = PropTypes.shape({isError: PropTypes.bool, message: PropTypes.oneOfType([PropTypes.string, PropTypes.array])});

SetUserInfo.propTypes = {
    buttonText: PropTypes.string,
    fieldCange: PropTypes.func,
    validateState: PropTypes.shape({
        sex: shapeForValidationField,
        email: shapeForValidationField,
        firstname: shapeForValidationField, 
        surname: shapeForValidationField,
        parrentname: shapeForValidationField,
        birthdate: shapeForValidationField
    }),
    sex: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    surname: PropTypes.string,
    parrentname: PropTypes.string,
    birthdate: PropTypes.string
  };



export default SetUserInfo;




