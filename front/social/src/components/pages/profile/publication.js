import React, { Component } from 'react';
import { Paper } from "@material-ui/core";
import Link from 'react-router-dom/Link';
import { PROFILE_CONSTS } from '../../../constans/profile';
import connect from 'react-redux/lib/connect/connect';


class Publication extends Component {
   
    render() {
        let { publication, language } = this.props;
      return (
        <Paper className="publication-wrapper">
            <PublicationUserTitle language={language} {...this.props}/>
            <div className="publication-content"> 
                <div className="publication-content-text">
                    {publication.textBody}
                </div>
            </div>
        </Paper>
      );
    }
}

class PublicationUserTitle extends Component {

    render() {
        let { publication, language, publication: { user } } = this.props;
        return (
            <div className="publication-title-wrapper">
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
        );
      }
}


class PublicationList extends Component {
    
    render() {
        let { publications, app } = this.props;
        return (
            <div className="publication-list">
                <ul>
                    {publications.map((value, index) => {
                        return <li key={index}><Publication language={app.currentLanguage} publication={value}/></li>
                    })}
                </ul>

            </div>
        );
    }
}

export default connect(
    state => ({
        app: state.app
    })
)(PublicationList);