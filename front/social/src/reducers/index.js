import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import registerModel from './registrationModel'

export default combineReducers({
    routing: routerReducer,
    registerModel
})