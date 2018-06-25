import React, { Component } from 'react';
import { Paper } from "@material-ui/core"
import { connect } from 'react-redux';
import { getAuthUserData } from '../../../actions/Account';
import { getUserData } from '../../../actions/Users';
import Avatar from './avatar'
import MainInfo from './mainInfo'
import { PROFILE_CONTENT } from '../../../content/profile';

class Profile extends Component {

    componentWillMount(){
      this.update(this.props.id);
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.id !== this.props.id)
        this.update(nextProps.id);
    }

    update(id){
      const {props} = this;
      if(id !== props.app.authorizedUser._id)
        props.onEnter(id);
      else props.getMyData();
    }

    render() {
      const { userData, isNotFound } = this.props.profile
      const forRender = (isNotFound) ? <NotFound/> : <Found user={userData}/>
      
      return (
        <div >
            {forRender}
        </div>
      );
    }
}


class Found extends Component
{
    render(){
      var {user} = this.props;
      return (
        <div className="profile-page">
          <div className="left-side-profile">
              <Avatar user={user}/>
          </div>
          <div className="right-side-profile">
              <MainInfo user={user}/>
          </div>
        </div>
      )
    }
}


class NotFound extends Component
{
  render(){
    return (
      <div className="not-found-wrapper">
        <Paper className="not-found-papper">
          <span>{PROFILE_CONTENT.PAGE_NOT_FOUNT}</span>
        </Paper>
      </div>
    )
  }
}

export default connect(
  state => ({
      profile: state.profile,
      app: state.app
  }),
  dispatch => ({
    onEnter: (id) => {
      dispatch(getUserData(id))
    },
    getMyData(){
      dispatch(getAuthUserData())
    }
  })
)(Profile);