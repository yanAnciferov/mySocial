import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper/Paper';
import SetUserInfo from "../../common/setUserInfo"
import { ACTION_FOR_EDIT } from "../../../constans/ActionTypes"
import { edit } from '../../../actions/Account';
import CommonContent from "../../../content/common"

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
        let { edit, onChange } = this.props;
        return (
            <Paper className="edit-wrapper">
                <span className="header">Основная информация</span>
                <SetUserInfo
                    onSubmit={this.onSubmit} 
                    onChange={onChange} 
                    fieldChange={this.fieldChange} 
                    source={edit} 
                    buttonText={CommonContent.Save}/>
            </Paper>
        );
    }
}


export default connect(
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
  )(Edit);