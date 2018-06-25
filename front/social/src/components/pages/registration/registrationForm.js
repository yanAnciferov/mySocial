import React, { Component } from 'react';

import {  FormControl, FormHelperText, Button, MenuItem,
      TextField, Select, Grid, Typography  } from '@material-ui/core'; 

import { connect } from 'react-redux';

import { MODEL_NAMES, DATE, SEX_TYPES } from '../../../constans/registration'
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes'

import Content from "../../../content/registration"
import TextFormControl from '../../common/textFormControl';
import SelectGenderControl from '../../common/selectGender'
import SetUserInfo from '../../common/setUserInfo';
class RegistrationForm extends Component {
    
    fieldChange = (type, event) => {
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
    
    let { register, onChange } = this.props
    
    return (
        <div className="formWrapper">
            <Typography variant="title" color="inherit">
                {Content.StepCommonInfoHeader}
            </Typography>
            <SetUserInfo onSubmit={this.onSubmit} onChange={onChange} fieldChange={this.fieldChange} source={register} />
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
)(RegistrationForm)
