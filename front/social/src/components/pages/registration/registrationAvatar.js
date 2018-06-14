import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Button } from "@material-ui/core"
import Slider from '@material-ui/lab/Slider'
import { connect } from 'react-redux'
import * as actionTypes from "../../../constans/ActionTypes"

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

    var valid = this.props.register.validateState.image;
    var model = this.props.register.image.file;
    return (
      <div className="create-avatar">
        <h3 className="registrationFormHeader">Установка аватара</h3>
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
        <div className="file-input-wrapper">
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={this.handleNewImage}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" >
                    Загрузить файл
                </Button>
                <span className="error">{(valid.isError) ? valid.message : ""}</span>
            </label>
        </div>
        <div className="avatar-zoom"> 
            <span>Zoom:</span>
            <Slider
                min={1}
                max={2}
                step={0.01}
                defaultValue={1}
                onChange={this.handleScaleMy}
                value={this.state.scale}
            />
        </div>
        <div className="avatar-buttons">
            <Button variant="contained" onClick={this.backHandle} color="primary">Назад</Button>
            <div>
              <Button color="primary" onClick={this.skip}>Пропустить</Button>
              <Button variant="contained" onClick={this.registrationHandle} color="primary">Регистрация</Button>
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
                dispatch({ type: actionTypes.ON_IMAGE_LOAD, payload: newValue})
            },
            prevStep: (newValue) => {
              dispatch({ type: actionTypes.PREV_STEP})
            },
            registration: (rect) => {
              dispatch({ type: actionTypes.AVATAR_SUBMIT, payload: rect})
            },
            skip: (rect) => {
              dispatch({ type: actionTypes.AVATAR_SKIP})
            }
        })
)(RegistrationAvatar);
