import { combineReducers } from 'redux'

import register from './registration'
import app from './app'
import catcher from './catcher'
import login from './login'

export default {
    register,
    app,
    catcher,
    login
}