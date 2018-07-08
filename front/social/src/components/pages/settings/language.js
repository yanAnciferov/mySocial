import React, { Component } from 'react';
import { Paper, FormControl } from "@material-ui/core"
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Button from '@material-ui/core/Button/Button';
import { LANGUAGE } from '../../../content/settings';

class Language extends Component {

    render() { 
        let { currentLanguage, selectedChange, t } = this.props;
        return (
        <Paper className="settings-element">
            <div className="papper-header">{t(LANGUAGE.CHANGE_LANG_TITTLE)}</div>
            <div className="settings-element-content">
                <FormControl className="settings-password-field">
                    <Select 
                        onChange={selectedChange}
                        displayEmpty
                        value={currentLanguage}
                        fullWidth>
                        <MenuItem value="ru">Русский</MenuItem>
                        <MenuItem value="ua">Український</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </FormControl>
            
                <Button 
                    className="settings-submit" 
                    variant="contained" color="primary">{t(LANGUAGE.CHANGE_LANG_SUBMIT)}</Button>
            </div>
            
        </Paper>
      );
    }
}




export default Language;