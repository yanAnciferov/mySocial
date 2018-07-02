import { MenuList, MenuItem, ListItemText} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { ACTION_FOR_APP } from '../../constans/ActionTypes';
import Paper from '@material-ui/core/Paper/Paper';
import { PROFILE_CONTENT } from '../../content/profile';


class MainMenu extends React.Component {

    onLogoutClick = () => {
      this.props.onLogout();
    }
  
    render() {

        

        const { authorizedUser } = this.props.app;
                
        if(!authorizedUser)
            return null;

        let { incoming:{ length } } = authorizedUser;
        let forFriendsRender = length ? <div>+{authorizedUser.incoming.length}</div> : null


        return (
            <div className="main-menu">
            <Paper className="main-menu-paper">
                <MenuList>
                    <Link to={`/${authorizedUser._id}`}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.MY_PAGE} />
                        </MenuItem>
                    </Link>
                    <MenuItem >
                        <ListItemText primary={PROFILE_CONTENT.MY_FRIENDS} />
                        { forFriendsRender }
                    </MenuItem>
                    <Link to={`/search`}>
                        <MenuItem >
                            <ListItemText primary={PROFILE_CONTENT.SEARCH} />
                        </MenuItem>
                    </Link>
                    <MenuItem>
                        <ListItemText primary={PROFILE_CONTENT.MY_NEWS} />
                    </MenuItem>
                    <MenuItem>
                        <ListItemText primary={PROFILE_CONTENT.SETTINGS} />
                    </MenuItem>
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