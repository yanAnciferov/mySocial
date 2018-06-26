import React, { Component } from 'react';

import { Typography  } from '@material-ui/core'; 

import { connect } from 'react-redux';
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes'

import Content from "../../../content/registration"
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
            <SetUserInfo buttonText={Content.NextStep} onSubmit={this.onSubmit} onChange={onChange} fieldChange={this.fieldChange} source={register} />
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
