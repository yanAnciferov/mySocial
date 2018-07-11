import React, { Component } from 'react'; 
import Link from 'react-router-dom/Link';
import { PROFILE_CONSTS } from '../../../constans/profile';
import connect from 'react-redux/lib/connect/connect';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import translate from 'react-i18next/dist/commonjs/translate';
import common from '../../../content/common';
import { ACTION_FOR_MESSAGEBOX } from '../../../constans/ActionTypes';
import { deletePublication } from '../../../actions/Account';
import { PROFILE_CONTENT } from '../../../content/profile';


class Publication extends Component {
   
    render() {
        let { publication, language, t, deleteDelegate, user } = this.props;
        const isMyPublication = user._id === publication.user._id;
      return (
        <div className="publication-wrapper papper">
            <PublicationUserTitle isMyPublication={isMyPublication} deleteDelegate={deleteDelegate} t={t} language={language} {...this.props}/>
            <div className="publication-content"> 
                <pre className="publication-content-text">
                    {publication.textBody}
                </pre>
            </div>
        </div>
      );
    }
}

class PublicationUserTitle extends Component {

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    state = {
        anchorEl: null,
    };

    onDelete = () => {
        let { deleteDelegate, publication } = this.props;
        this.handleClose();
        deleteDelegate(publication._id);
    }

    render() {
        let { publication, isMyPublication, language, t,  publication: { user } } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const forRenderButton = isMyPublication ? 
        <DeletePublcationButton 
            handleClose={this.handleClose}
            open={open}
            anchorEl={anchorEl}
            handleMenu={this.handleMenu}
            onDelete={this.onDelete}
            t={t}  /> 
            : null

        return (
            <div className="publication-title-wrapper">
                <div className="publication-title-left">
                    <div className="publication-title-avatar">
                        <img src={user.minAvatar} alt="ava"/>
                    </div>
                    <div className="publication-title-info"> 
                        <div className="publication-title-name">
                            <Link to={`/${user._id}`}>{`${user.firstname} ${user.surname}`}</Link>
                        </div>
                        <div className="publication-title-date">{new Date(publication.datePublication).toLocaleDateString(language, PROFILE_CONSTS.DATE_FORMAT_FOR_PUBLICATION)}</div>
                    </div>
                </div>
                <div className="publication-title-left">
                    {forRenderButton}
                </div>
            </div>
        );
      }
}

class DeletePublcationButton extends Component {
    render(){
        let { handleMenu, anchorEl, open, handleClose, onDelete, t } = this.props;
        return (
            <div>
                <div onClick={handleMenu} className="publication-title-button">
                    <img src="./icons/menu.svg" alt="menu"/>
                </div>
                <Menu
                    className="header-popap-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open}
                    onClose={handleClose}
                    >
                    
                    <MenuItem onClick={onDelete}>{t(common.Delete)}</MenuItem>
                </Menu>
            </div>
        )
    }
}


class PublicationList extends Component {
    
    deleteDelegate = (id) => {
        this.props.onDeletePublication(id);
    }

    render() {
        let { publications, app, t } = this.props;
       
        return (
            <div className="publication-list">
                <ul>
                    {publications.map((value, index) => {
                        return <li key={index}>
                            <Publication 
                                deleteDelegate={this.deleteDelegate} 
                                t={t} 
                                language={app.currentLanguage} 
                                publication={value}
                                user={app.authorizedUser}/></li>
                    })}
                </ul>

            </div>
        );
    }
}

export default translate("translations")(connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
        onDeletePublication: (id) => {
            dispatch({type: ACTION_FOR_MESSAGEBOX.MESSAGEBOX_CALL, payload: {
                    message: PROFILE_CONTENT.FOR_DELETE_PUBLICATION,
                    okDelegate: () => { dispatch(deletePublication(id)) },
                    cancelDelegate: () => {}
                }
            })
        }
    })
)(PublicationList));