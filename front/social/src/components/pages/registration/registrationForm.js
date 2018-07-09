import React, { Component } from 'react';

import { Typography  } from '@material-ui/core'; 

import { connect } from 'react-redux';
import { ACTION_FOR_REGISTRATION } from '../../../constans/ActionTypes'

import Content from "../../../content/registration"
import SetUserInfo from '../../common/setUserInfo';
import translate from 'react-i18next/dist/commonjs/translate';
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
    
    let { register, onChange, t } = this.props
    
    return (
        <div className="formWrapper">
            <Typography variant="title" color="inherit">
                {t(Content.StepCommonInfoHeader)}
            </Typography>
            <SetUserInfo 
                    buttonText={Content.NextStep} 
                    onSubmit={this.onSubmit} 
                    onChange={onChange} 
                    fieldChange={this.fieldChange} 
                    t={t}
                    {...register} />
        </div>
    );
    }
}



export default translate("translations")(connect(
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
)(RegistrationForm))
