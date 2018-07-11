import React, { Component } from 'react';
import { FormControl } from "@material-ui/core"
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { LANGUAGE } from '../../../content/settings';

class Language extends Component {

    render() { 
        let { currentLanguage, selectedChange, t } = this.props;
        return (
        <div className="settings-element papper">
            <div className="papper-header">{t(LANGUAGE.CHANGE_LANG_TITTLE)}</div>
            <div className="settings-element-content">
                <FormControl className="settings-password-field">
                    <Select 
                        onChange={selectedChange}
                        displayEmpty
                        value={currentLanguage}
                        fullWidth>
                        <MenuItem value="ru">Русский</MenuItem>
                        <MenuItem value="uk">Український</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </Select>
                </FormControl>
            </div>
            
        </div>
      );
    }
}




export default Language;