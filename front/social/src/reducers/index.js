import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import register from './registration'

export default combineReducers({
    routing: routerReducer,
    register
})