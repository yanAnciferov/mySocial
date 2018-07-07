import React, { Component } from 'react';
import { connect } from 'react-redux';
import Language from './language';
import Password from './password';
import { ACTION_FOR_PASSWORD } from '../../../constans/ActionTypes';
import { changePassword } from '../../../actions/Account';

class Setting extends Component {

    fieldChange = (field, e) => {
        this.props.passwordFieldChange(field, e.target.value);
    }

    onPasswordSubmit = (e) => {
        e.preventDefault();
        this.props.submitPassword();
    }

    render() { 
        let { fieldChange, onPasswordSubmit } = this;
        let { password } = this.props;
        return (
        <div >
            <Language />
            <Password
                {...password}
                fieldChange={fieldChange}
                onSubmit={onPasswordSubmit}
            />
        </div>
      );
    }
}




export default connect(
    state => ({
       password: state.password
    }),
    dispatch => ({
       passwordFieldChange: (name, value) => {
            dispatch({type: ACTION_FOR_PASSWORD.PASSWORD_CHANGE, payload: {
                name,
                value
            }})
       },
       submitPassword: () => {
        dispatch({type: ACTION_FOR_PASSWORD.PASSWORD_SUBMIT});
        dispatch(changePassword());
       }
    })
)(Setting);