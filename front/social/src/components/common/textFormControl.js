import React, { Component } from 'react';

import {  FormControl, TextField  } from '@material-ui/core'; 

class TextFormControl extends Component {
    
    render() {
    
        let { label, message, isError, value, onChange, fullWidth, type, inputProps } = this.props;
        if(!type)
            type="text"
        return (
        <FormControl className="registerControl" required fullWidth={fullWidth}>
            <TextField 
                label={label} 
                helperText={message}
                onChange={onChange}
                value={value}
                error={isError}
                type={type}
                inputProps={inputProps}
                />
        </FormControl>
        );
    }
}

export default TextFormControl;


