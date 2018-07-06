import React, { Component } from 'react';
import { Paper } from "@material-ui/core";
import Link from 'react-router-dom/Link';
import { PROFILE_CONSTS } from '../../../constans/profile';


class Publication extends Component {
   
    render() {
        let { publication } = this.props;
      return (
        <Paper className="publication-wrapper">
            <PublicationUserTitle {...this.props}/>
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
        let { publication, publication: { user } } = this.props;
        return (
            <div className="publication-title-wrapper">
                <div className="publication-title-avatar">
                    <img src={user.minAvatar} alt="ava"/>
                </div>
                <div className="publication-title-info"> 
                    <div className="publication-title-name">
                        <Link to={`/${user._id}`}>{`${user.firstname} ${user.surname}`}</Link>
                    </div>
                    <div className="publication-title-date">{new Date(publication.datePublication).toLocaleDateString(PROFILE_CONSTS.LOCAL_FORMAT, PROFILE_CONSTS.DATE_FORMAT_FOR_PUBLICATION)}</div>
                </div>
            </div>
        );
      }
}


class PublicationList extends Component {
    
    render() {
        let { publications } = this.props;
        return (
            <div className="publication-list">
                <ul>
                    {publications.map((value, index) => {
                        return <li key={index}><Publication publication={value}/></li>
                    })}
                </ul>

            </div>
        );
    }
}

export default PublicationList;