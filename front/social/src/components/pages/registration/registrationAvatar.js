import React from 'react'
import { Button, Typography } from "@material-ui/core"
import { connect } from 'react-redux'
import { ACTION_FOR_REGISTRATION } from "../../../constans/ActionTypes"
import { registration } from "../../../actions/Account";
import Content from "../../../content/registration"
import AvatarPricker from "../../common/avatarPicker";
import { translate } from 'react-i18next';

class RegistrationAvatar extends React.Component {

  render() {

    let { onRectChange, onImageLoad, register, skip, registration, prevStep, t } = this.props;
    return (
      <div className="create-avatar">
        <div className="papper-header">
          <Typography variant="headline" color="inherit">
          {t(Content.StepAvatarHeader)}
          </Typography>
        </div>
        <div className="papper-content">
          <AvatarPricker t={t} onRectChange={onRectChange} onImageLoad={onImageLoad} {...register} />
        
          <div className="avatar-buttons">
              <Button variant="contained" onClick={prevStep} color="primary">{t(Content.PrevButton)}</Button>
              <div>
                <Button color="primary" onClick={skip}>{t(Content.SkipButton)}</Button>
                <Button variant="contained" onClick={registration} color="primary">{t(Content.NextButton)}</Button>
              </div>
          </div>
        </div>       
      </div>
    )
  }
}

export default translate("translations")(connect(
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
)(RegistrationAvatar));
