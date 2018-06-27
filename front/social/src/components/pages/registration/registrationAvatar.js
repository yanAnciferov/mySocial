import React from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Button, Typography, Grid } from "@material-ui/core"
import Slider from '@material-ui/lab/Slider'
import { connect } from 'react-redux'
import { ACTION_FOR_REGISTRATION } from "../../../constans/ActionTypes"
import { registration } from "../../../actions/Account"
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Content from "../../../content/registration"
import AvatarPricker from "../../common/avatarPicker";

class RegistrationAvatar extends React.Component {

  render() {

    let { onRectChange, onImageLoad, register, skip, registration, prevStep } = this.props;
   
    return (
      <div className="create-avatar">
        <Toolbar>
          <Typography variant="headline" className="stepHeader" color="inherit">
          {Content.StepAvatarHeader}
          </Typography>
        </Toolbar>
        
        <AvatarPricker onRectChange={onRectChange} onImageLoad={onImageLoad} {...register} />
       
        <div className="avatar-buttons">
            <Button variant="contained" onClick={prevStep} color="primary">{Content.PrevButton}</Button>
            <div>
              <Button color="primary" onClick={skip}>{Content.SkipButton}</Button>
              <Button variant="contained" onClick={registration} color="primary">{Content.NextButton}</Button>
            </div>
        </div>

       
      </div>
    )
  }
}

export default connect(
        state => ({
            register: state.register
        }),
        dispatch => ({
            onImageLoad: (newValue) => {
                dispatch({ type: ACTION_FOR_REGISTRATION.ON_IMAGE_LOAD, payload: newValue})
            },
            prevStep: (newValue) => {
              dispatch({ type: ACTION_FOR_REGISTRATION.PREV_STEP})
            },
            onRectChange: (rect) => {
              dispatch({type: ACTION_FOR_REGISTRATION.ON_IMAGE_RECT_CHANGE_TO_REGISTRATION, payload: rect})
            },
            registration: () => {
              dispatch({ type: ACTION_FOR_REGISTRATION.AVATAR_SUBMIT})
              dispatch(registration());
            },
            skip: () => {
              dispatch({ type: ACTION_FOR_REGISTRATION.AVATAR_SKIP})
              dispatch(registration());
            }
        })
)(RegistrationAvatar);
