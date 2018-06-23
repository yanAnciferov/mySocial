import React from "react";
import ReactDOM from "react-dom";
import axios from "axios"
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createHistory from "history/createBrowserHistory";

import thunk from 'redux-thunk'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from "react-router-redux";

import Reducers from "./reducers/index"; 

axios.defaults.baseURL = 'http://localhost:3001';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...Reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, thunk)
);




ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
