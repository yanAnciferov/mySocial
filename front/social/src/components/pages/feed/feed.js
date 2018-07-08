import React, { Component } from 'react';
import { connect } from 'react-redux';
import PublicationCreator from '../../common/publicationCreator';
import { getNews } from "../../../actions/Feed";
import PublicationList from '../../pages/profile/publication';
import Paper from '@material-ui/core/Paper/Paper';
import { PROFILE_CONTENT } from '../../../content/profile';
import translate from 'react-i18next/dist/commonjs/translate';

class Feed extends Component {
    componentDidMount(){
        this.props.start();
    }

    componentWillReceiveProps(newProps){
        if(newProps.feed.toUpdate){
            this.props.start();

        }
    }


    render() {
        let { feed } = this.props;
        return (
            <div>
                <PublicationCreator />
                <FeedPublicationList publications={feed.publications} />
            </div>
        );
    }
}

class FeedPublicationList extends Component {
    render() {
        let { props: { publications } } = this;
        let forRender = publications.length ? <PublicationList publications={publications}  /> 
            : <Paper className="no-news">{PROFILE_CONTENT.NEWS_NOT_FOUND}</Paper>
        
        return forRender;
    }
}


export default connect(
    state => ({
        feed: state.feed
    }),
    dispatch => ({
       start(){
           dispatch(getNews());
       }
    })
)(Feed);