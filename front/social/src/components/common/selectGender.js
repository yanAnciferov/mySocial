import React, { Component } from 'react';
import Content from "../../content/registration"
import {  FormControl, Select, MenuItem, FormHelperText  } from '@material-ui/core'; 
import { SEX_TYPES } from '../../constans/registration';

class SelectGenderControl extends Component {
    
    render() {

        let { isError, value, fieldCange, message, t} = this.props;

        return (
        <FormControl fullWidth error={isError} >
            <Select 
                required
                value={value}
                displayEmpty
                onChange={fieldCange}
                fullWidth
                >
                <MenuItem value="" disabled>{t(Content.SexLabel)}</MenuItem>
                <MenuItem value={SEX_TYPES.MALE}>{t(Content.Male)}</MenuItem>
                <MenuItem value={SEX_TYPES.FEMALE}>{t(Content.Female)}</MenuItem>
            </Select>
            <FormHelperText>{t(message)}</FormHelperText>
        </FormControl>
        )
    }
}

export default SelectGenderControl;


