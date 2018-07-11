import { MenuList, MenuItem, ListItemText} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import { PROFILE_CONTENT } from '../../content/profile';
import { MENU_LINKS } from '../../constans/common';
import { translate } from 'react-i18next';


class MainMenu extends React.Component {

    onLogoutClick = () => {
      this.props.onLogout();
    }
  
    render() {
        const { FEED, SEARCH, getUrlToMyFriends, SETTINGS, getUrlToMyPage } = MENU_LINKS;
        const {  app: { authorizedUser }, t } = this.props;
                
        if(!authorizedUser)
            return null;

        let { incoming:{ length } } = authorizedUser;
        let forFriendsRender = length ? <div>+{authorizedUser.incoming.length}</div> : null

        return (
            <div className="main-menu">
            <div className="main-menu-paper papper">
                <MenuList>
                    <Link to={getUrlToMyPage(authorizedUser._id)}>
                        <MenuItem className="main-menu-item">
                            <div className="main-menu-icon">
                                <img src="./icons/home.svg" alt="home"/>
                            </div>
                            <ListItemText className="main-menu-text" primary={t(PROFILE_CONTENT.MY_PAGE)} />
                        </MenuItem>
                    </Link>
                    <Link to={getUrlToMyFriends(authorizedUser._id)}>
                        <MenuItem className="main-menu-item">
                            <div className="main-menu-icon">
                                <img src="./icons/friends.svg" alt="home"/>
                            </div>
                            <ListItemText className="main-menu-text" primary={t(PROFILE_CONTENT.MY_FRIENDS)} />
                            { forFriendsRender }
                        </MenuItem>
                    </Link>
                    <Link to={SEARCH}>
                        <MenuItem className="main-menu-item">
                            <div className="main-menu-icon">
                                <img src="./icons/search.svg" alt="home"/>
                            </div>
                            <ListItemText className="main-menu-text" primary={t(PROFILE_CONTENT.SEARCH)} />
                        </MenuItem>
                    </Link>
                    <Link to={FEED}>
                        <MenuItem className="main-menu-item">
                            <div className="main-menu-icon">
                                <img src="./icons/newspaper.svg" alt="home"/>
                            </div>
                            <ListItemText className="main-menu-text" primary={t(PROFILE_CONTENT.MY_NEWS)} />
                        </MenuItem>
                    </Link>
                    <Link to={SETTINGS}>
                        <MenuItem className="main-menu-item">
                            <div className="main-menu-icon">
                                <img src="./icons/settings.svg" alt="home"/>
                            </div>
                            <ListItemText className="main-menu-text" primary={t(PROFILE_CONTENT.SETTINGS)} />
                        </MenuItem>
                    </Link>
                </MenuList>
            </div>
            </div>
        );
    }
  }


  export default translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
      onLogout: () => {
        dispatch({ type: ACTION_FOR_APP.LOGOUT});
      }
  })
)(MainMenu));