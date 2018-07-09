import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import TextFormControl from "../../common/textFormControl"
import UserList from "../../common/usersList"
import { search } from '../../../actions/Search';
import { push } from 'react-router-redux/actions';
import { ACTION_FOR_SEARCH } from '../../../constans/ActionTypes';
import { SearchContent } from '../../../content/search';
import { translate } from "react-i18next";

class Search extends Component {

    componentWillMount(){
        this.props.startSearch();
    }

    onChange(e){
        this.props.onChange(e.target.value);
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.setNewQuery(this.props.search.query.trim());
    }

    render() { 
        let { t } = this.props;
        let { result, query } = this.props.search;
        let forRender = result.length ? 
            <UserList t={t} usersList={this.props.search.result} /> : 
                <div className="search-noresult">{SearchContent.notFound}</div>
        return (
        <div >
            <Paper className="search-wrapper">
                <h3>{t(SearchContent.searchTitle)}</h3>
                <form onSubmit={this.onSubmit}>
                    <TextFormControl 
                        onChange={(e) => this.onChange(e)} 
                        value={query} 
                        label={t(SearchContent.enterLabel)} 
                        fullWidth={true} />
                </form>
                {forRender}
            </Paper>
        </div>
      );
    }
}




export default 
translate("translations")(
    connect(
    state => ({
        search: state.search
    }),
    dispatch => ({
        startSearch: () => {
            dispatch(search());
        },
        setNewQuery: (value) => {
            const query = new URLSearchParams()
            query.set('query', value)
            dispatch(push({ pathname: '/search', search: query.toString() }));
            dispatch(search());
        },
        onChange: (value) => {
            dispatch({type: ACTION_FOR_SEARCH.ON_QUERY_CHANGE, payload: value});
        }

    })
)(Search));