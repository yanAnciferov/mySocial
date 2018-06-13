import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux"
import { createStore } from "redux"
import Reducers from "./reducers/index"

const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>, 
  document.getElementById('root'));
registerServiceWorker();