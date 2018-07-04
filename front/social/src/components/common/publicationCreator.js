import React, { Component } from 'react';
import { Paper, TextField } from "@material-ui/core";
import Link from 'react-router-dom/Link';
import TextFormControl from "./textFormControl";
import Button from '@material-ui/core/Button/Button';
import { ACTION_FOR_PUBLICATION } from '../../constans/ActionTypes';
import { connect } from 'react-redux';
import { sendNewPublication } from "../../actions/Account"


class PublicationCreator extends Component {

    state = {
        isFocusInput: false,
        countRows: 1
    }

    onFocus = () => {
         this.setState({
             isFocusInput: true
            })
    }

    onChange = (e) => {
        this.props.onTextChange(e.target.value);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }

    onLostFocus = () => {
        this.setState({
            isFocusInput: false
        })
    }

    
    render() {
        let { onFocus, onLostFocus, state, onChange, 
            props: { publication: { text }, isMyPage }  } = this;
        if(!isMyPage)
            return null;
        return (
        <Paper className="pubcreate-wrapper">
            <form onSubmit={this.onSubmit}>
                <TextField 
                    className="pubcreate-area"
                    multiline={true} 
                    fullWidth={true} 
                    onFocus={onFocus} 
                    onBlur={onLostFocus}
                    onChange={onChange}
                    placeholder="Что у вас нового?" 
                    value={text}
                    />
                <div className="pubcreate-submit-wrapper">
                    <Button type="submit" className="pubcreate-submit" variant="contained" color="primary">Отправить</Button>
                </div>
            </form>
        </Paper>
      );
    }
}

export default connect(

    state =>({
        publication: state.publication
    }),
    dispatch => ({
        onTextChange: (text) => {
            dispatch({type: ACTION_FOR_PUBLICATION.ON_PUB_TEXT_CHANGE, payload: text})
        },
        onSubmit: () => {
            dispatch({type: ACTION_FOR_PUBLICATION.ON_PUB_SUBMIT});
            console.log('!!')
            dispatch(sendNewPublication());
        }
    })
)(PublicationCreator);