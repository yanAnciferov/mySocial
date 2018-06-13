import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration"

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/registration">Registration</Link></li>
        </ul>

        <Route path="/" exact component={Welcome}/>
        <Route path="/registration" component={Registration}/>
      </div>
    );
  }
}

export default App;
