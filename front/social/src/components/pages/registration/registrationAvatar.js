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


class RegistrationAvatar extends React.Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 250,
    height: 250,
  }

  handleNewImage = e => {
    this.props.onImageLoad(e.target.files[0]);
  }

  handleScaleMy = (e, value) => {
    const scale = parseFloat(value)
    this.setState({ scale })
  }

  logCallback(e) {
    console.log('callback', e)
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  handleDrop = acceptedFiles => {
    this.props.onImageLoad(acceptedFiles[0]);
  }

  registrationHandle = e => {
   
    const rect = this.editor.getCroppingRect()
    this.props.registration(rect);
  }

  skip = e => {
    this.props.skip();
  }

  backHandle = e => {
    this.props.prevStep();
  }

  render() {

    let { register:{ 
      validateState: { 
        image,
        image: {
          file:model
        } 
      } 
    }
  } = this.props

    return (
      <div className="create-avatar">
        <Toolbar>
          <Typography variant="headline" className="stepHeader" color="inherit">
          {Content.StepAvatarHeader}
          </Typography>
        </Toolbar>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Dropzone
              onDrop={this.handleDrop}
              disableClick
              multiple={false}
              style={{ width: this.state.width, height: this.state.height, marginBottom:'70px' }}
            >
              <div>
                <ReactAvatarEditor
                  ref={this.setEditorRef}
                  scale={parseFloat(this.state.scale)}
                  width={this.state.width}
                  height={this.state.height}
                  position={this.state.position}
                  onPositionChange={this.handlePositionChange}
                  onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                  onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                  onImageReady={this.logCallback.bind(this, 'onImageReady')}
                  image={model}
                  className="editor-canvas"
                  color={[255,255,255,128]}
                />
              </div>
            </Dropzone>         
          </Grid>
          <Grid item xs={4}>
            <div className="avatar-controll">
              <div className="avatar-zoom"> 
                  <span>Масштаб:</span>
                  <Slider
                      min={1}
                      max={2}
                      step={0.01}
                      defaultValue={1}
                      onChange={this.handleScaleMy}
                      value={this.state.scale}
                  />
              </div>
              <div className="file-input-wrapper">
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={this.handleNewImage}
                />
                <label htmlFor="contained-button-file" className="contained-button-file">
                    <span className="error">{(image.isError) ? image.message : ""}</span>
                    <Button variant="contained" component="span" >
                        {Content.LoadFile}
                    </Button>
                </label>
              </div>
            </div>
          </Grid>
        </Grid>
       
        <div className="avatar-buttons">
            <Button variant="contained" onClick={this.backHandle} color="primary">{Content.PrevButton}</Button>
            <div>
              <Button color="primary" onClick={this.skip}>{Content.SkipButton}</Button>
              <Button variant="contained" onClick={this.registrationHandle} color="primary">{Content.NextButton}</Button>
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
            registration: (rect) => {
              dispatch({ type: ACTION_FOR_REGISTRATION.AVATAR_SUBMIT, payload: rect})
              dispatch(registration());
            },
            skip: (rect) => {
              dispatch({ type: ACTION_FOR_REGISTRATION.AVATAR_SKIP})
              dispatch(registration());
            }
        })
)(RegistrationAvatar);
