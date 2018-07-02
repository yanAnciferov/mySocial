import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import TextFormControl from "../../common/textFormControl"
import UserList from "./usersList"
import { search } from '../../../actions/Search';
import { push } from 'react-router-redux/actions';
import { onSubscribed, onAccept } from '../../../socket';
import { ACTION_FOR_SEARCH } from '../../../constans/ActionTypes';
import { SearchContent } from '../../../content/search';

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
        
        let { subscribeToUser, acceptToFriend } = this.props;
        let { result, query } = this.props.search;
        let forRender = result.length ? 
            <UserList 
                onSubsribed={subscribeToUser} 
                usersList={this.props.search.result} 
                onAccept={acceptToFriend}/> : <div className="search-noresult">{SearchContent.notFound}</div>
        return (
        <div >
            <Paper className="search-wrapper">
                <h3>{SearchContent.title}</h3>
                <form onSubmit={this.onSubmit}>
                    <TextFormControl onChange={(e) => this.onChange(e)} value={query} label={SearchContent.enterLabel} fullWidth={true} />
                </form>
                {forRender}
            </Paper>
        </div>
      );
    }
}




export default connect(
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
        subscribeToUser: (email) => {
            dispatch(onSubscribed(email))
        },
        acceptToFriend: (id) => {
            dispatch(onAccept(id))
        },
        onChange: (value) => {
            dispatch({type: ACTION_FOR_SEARCH.ON_QUERY_CHANGE, payload: value});
        }

    })
)(Search);