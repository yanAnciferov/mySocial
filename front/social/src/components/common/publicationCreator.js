import React, { Component } from 'react';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button/Button';
import { ACTION_FOR_PUBLICATION } from '../../constans/ActionTypes';
import { connect } from 'react-redux';
import { sendNewPublication } from "../../actions/Account"
import commonContent from '../../content/common';
import { PROFILE_CONTENT } from '../../content/profile';
import { translate } from 'react-i18next';


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
        let { onFocus, onLostFocus, onChange, 
            props: { t, publication: { text } }  } = this;
        return (
        <div className="pubcreate-wrapper papper">
            <form onSubmit={this.onSubmit}>
                <TextField 
                    className="pubcreate-area"
                    multiline={true} 
                    fullWidth={true} 
                    onFocus={onFocus} 
                    onBlur={onLostFocus}
                    onChange={onChange}
                    placeholder={t(PROFILE_CONTENT.WHATS_APP)} 
                    value={text}
                    />
                <div className="pubcreate-submit-wrapper">
                    <Button 
                        type="submit" 
                        className="pubcreate-submit" 
                        variant="contained" 
                        color="primary">{t(commonContent.Send)}</Button>
                </div>
            </form>
        </div>
      );
    }
}

export default translate("translations")(connect(

    state =>({
        publication: state.publication
    }),
    dispatch => ({
        onTextChange: (text) => {
            dispatch({type: ACTION_FOR_PUBLICATION.ON_PUB_TEXT_CHANGE, payload: text})
        },
        onSubmit: () => {
            dispatch({type: ACTION_FOR_PUBLICATION.ON_PUB_SUBMIT});
            dispatch(sendNewPublication());
        }
    })
)(PublicationCreator));
