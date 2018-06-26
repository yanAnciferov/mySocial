import React, { Component } from 'react';
import Content from "../../content/registration"
import {  FormControl, Select, MenuItem, FormHelperText  } from '@material-ui/core'; 
import { SEX_TYPES } from '../../constans/registration';

class SelectGenderControl extends Component {
    
    render() {

        let { isError, value, fieldCange, message} = this.props;

        return (
        <FormControl fullWidth error={isError} >
            <Select 
                required
                value={value}
                displayEmpty
                onChange={fieldCange}
                fullWidth
                >

                <MenuItem value="" disabled>{Content.SexLabel}</MenuItem>
                <MenuItem value={SEX_TYPES.MALE}>{Content.Male}</MenuItem>
                <MenuItem value={SEX_TYPES.FEMALE}>{Content.Female}</MenuItem>
            </Select>
            <FormHelperText>{message}</FormHelperText>
        </FormControl>
        )
    }
}

export default SelectGenderControl;


