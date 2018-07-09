import React, { Component } from 'react';
import { connect } from 'react-redux';
import Language from './language';
import Password from './password';
import { ACTION_FOR_PASSWORD, ACTION_FOR_APP } from '../../../constans/ActionTypes';
import { changePassword, changeLanguage } from '../../../actions/Account';
import translate from 'react-i18next/dist/commonjs/translate';

class Setting extends Component {

    fieldChange = (field, e) => {
        this.props.passwordFieldChange(field, e.target.value);
    }

    onPasswordSubmit = (e) => {
        e.preventDefault();
        this.props.submitPassword();
    }

    onLanguageChange = (e) => {
        let { i18n, languageChange } = this.props;
        i18n.changeLanguage(e.target.value);
        languageChange(e.target.value);
    }

    render() { 
        let { fieldChange, onPasswordSubmit, onLanguageChange } = this;
        let { password, app, t } = this.props;
        return (
        <div >
            <Language 
                currentLanguage={app.currentLanguage}
                selectedChange={onLanguageChange}
                t={t}/>
            <Password
                {...password}
                fieldChange={fieldChange}
                onSubmit={onPasswordSubmit}
                t={t}
            />
        </div>
      );
    }
}




export default 
translate("translations")(connect(
    state => ({
       password: state.password,
       app: state.app
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
       },
       languageChange(newLang){
        dispatch({type: ACTION_FOR_APP.LANGUAGE_CHANGE, payload: newLang});
        dispatch(changeLanguage());
       }
    })
)(Setting));