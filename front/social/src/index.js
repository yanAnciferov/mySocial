import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import thunk from 'redux-thunk'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { I18nextProvider } from "react-i18next";

import i18n from "./content/i18n";

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from "react-router-redux";

import Reducers from "./reducers/index"; 

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
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <App />
      </ConnectedRouter>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root'));
registerServiceWorker();
