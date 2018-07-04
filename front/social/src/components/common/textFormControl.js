import React, { Component } from 'react';

import {  FormControl, TextField  } from '@material-ui/core'; 

class TextFormControl extends Component {
    
    render() {
    
        let { label, message, isError, value, onChange, fullWidth, type, inputProps, multiline } = this.props;
        if(!type)
            type="text"
        return (
        <FormControl required fullWidth={fullWidth}>
            <TextField 
                label={label} 
                helperText={message}
                onChange={onChange}
                value={value}
                error={isError}
                type={type}
                inputProps={inputProps}
                multiline={multiline}
                />
        </FormControl>
        );
    }
}

export default TextFormControl;


