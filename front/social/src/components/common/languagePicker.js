import { withStyles ,AppBar, Button, Toolbar, Menu ,Typography, MenuItem, Paper, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

import content from "../../content/header"
import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import CircleAvatar from "./circleAvatar"
import { disconnectToServer } from '../../socket';
import translate from 'react-i18next/dist/commonjs/translate';
import MenuList from '@material-ui/core/MenuList/MenuList';


const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
      textAlign: "center"
    },
    primary: {},
    icon: {},
  });

class LanguagePicker extends React.Component {
  render() {
    const { classes, app: { authorizedUser } } = this.props;
  
    return (
      <Paper className="languagePicker">
        <MenuList value="en">
          <MenuItem className={classes.menuItem}>
            <ListItemText classes={{ primary: classes.primary }} primary="UA" />
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemText classes={{ primary: classes.primary }} primary="RU" />
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <ListItemText classes={{ primary: classes.primary }} value="en" primary="EN" />
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
}

export default withStyles(styles)(translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
     
  })
)(LanguagePicker)));