import React, { Component } from 'react';
import {  FormControl, FormHelperText, Button, MenuItem,
    TextField, Select, Grid, Typography  } from '@material-ui/core'; 
import { connect } from 'react-redux';
import { getAuthUserData } from '../../../actions/Account';
import { getUserData } from '../../../actions/Users';
import { PROFILE_CONTENT } from '../../../content/profile';
import { SEX_TYPES, MODEL_NAMES } from '../../../constans/registration';
import Content from "../../../content/registration"
import Paper from '@material-ui/core/Paper/Paper';
import TextFormControl from '../../common/textFormControl';
import SetUserInfo from "../../common/setUserInfo"
import { ACTION_FOR_EDIT } from "../../../constans/ActionTypes"


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
        console.log(edit)
      return (
       <Paper className="edit-wrapper">
            <h2>Основная информация</h2>
            <SetUserInfo onSubmit={this.onSubmit} onChange={onChange} fieldChange={this.fieldChange} source={edit} />
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
            dispatch({ type: ACTION_FOR_EDIT.EDIT_ON_SUBMIT, payload: model})
        }
    })
  )(Edit);