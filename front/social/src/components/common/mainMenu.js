import { MenuList, MenuItem, ListItemText} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import Paper from '@material-ui/core/Paper/Paper';
import { PROFILE_CONTENT } from '../../content/profile';
import { MENU_LINKS } from '../../constans/common';


class MainMenu extends React.Component {

    onLogoutClick = () => {
      this.props.onLogout();
    }
  
    render() {
        const { FEED, SEARCH, getUrlToMyFriends, SETTINGS, getUrlToMyPage } = MENU_LINKS;
        const { authorizedUser } = this.props.app;
                
        if(!authorizedUser)
            return null;

        let { incoming:{ length } } = authorizedUser;
        let forFriendsRender = length ? <div>+{authorizedUser.incoming.length}</div> : null

        return (
            <div className="main-menu">
            <Paper className="main-menu-paper">
                <MenuList>
                    <Link to={getUrlToMyPage(authorizedUser._id)}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.MY_PAGE} />
                        </MenuItem>
                    </Link>
                    <Link to={getUrlToMyFriends(authorizedUser._id)}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.MY_FRIENDS} />
                            { forFriendsRender }
                        </MenuItem>
                    </Link>
                    <Link to={SEARCH}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.SEARCH} />
                        </MenuItem>
                    </Link>
                    <Link to={FEED}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.MY_NEWS} />
                        </MenuItem>
                    </Link>
                    <Link to={SETTINGS}>
                        <MenuItem>
                            <ListItemText primary={PROFILE_CONTENT.SETTINGS} />
                        </MenuItem>
                    </Link>
                </MenuList>
            </Paper>
            </div>
        );
    }
  }


  export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      onLogout: () => {
        dispatch({ type: ACTION_FOR_APP.LOGOUT});
      }
  })
)(MainMenu);