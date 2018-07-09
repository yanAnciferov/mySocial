import { MenuItem, Paper, ListItemText } from '@material-ui/core';
import React from 'react';

import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import translate from 'react-i18next/dist/commonjs/translate';
import MenuList from '@material-ui/core/MenuList/MenuList';



class LanguagePicker extends React.Component {


    changeLanguage = (value) => {
        let { i18n, onLanguageChange } = this.props;
        i18n.changeLanguage(value);
        onLanguageChange(value);
    }

  render() {
    const { app: { currentLanguage } } = this.props;
    const langs = [ 
            { value: "uk", title: "UA" },
            { value: "ru", title: "RU" },
            { value: "en", title: "EN" } 
        ]

    return (
      <Paper className="languagePicker">
        <MenuList>
            {langs.map((lang, index ) => {
                return(
                <MenuItem key={index} onClick={() => { this.changeLanguage(lang.value) }} className={(currentLanguage === lang.value) ? "focus" : ""}>
                    <ListItemText primary={lang.title}/>
                </MenuItem>
                )
            })}
        </MenuList>
      </Paper>
    );
  }
}

export default translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
        onLanguageChange(lang){
            dispatch({type: ACTION_FOR_APP.LANGUAGE_CHANGE, payload: lang});
        }
    })
)(LanguagePicker));