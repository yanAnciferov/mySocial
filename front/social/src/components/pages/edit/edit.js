import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetUserInfo from "../../common/setUserInfo"
import { ACTION_FOR_EDIT } from "../../../constans/ActionTypes"
import { edit } from '../../../actions/Account';
import CommonContent from "../../../content/common"
import { PROFILE_CONTENT } from "../../../content/profile"
import translate from 'react-i18next/dist/commonjs/translate';

class Edit extends Component {

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
        let { edit, onChange, t } = this.props;
        return (
            <div className="edit-wrapper papper">
                <span className="header">{t(PROFILE_CONTENT.MAIN_INFO)}</span>
                <SetUserInfo
                    onSubmit={this.onSubmit} 
                    onChange={onChange} 
                    fieldChange={this.fieldChange} 
                    {...edit} 
                    buttonText={CommonContent.Save}
                    t={t}/>
            </div>
        );
    }
}


export default translate("translations")(connect(
    state => ({
        edit: state.edit
    }),
    dispatch => ({
        onChange: (newValue) => {
            dispatch({ type: ACTION_FOR_EDIT.EDIT_ON_CHANGE, payload: newValue})
        },
        onSubmit: (model) => {
            dispatch({ type: ACTION_FOR_EDIT.EDIT_ON_SUBMIT, payload: model});
            dispatch(edit())
        }
    })
  )(Edit));