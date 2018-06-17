import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


import Welcome from "./components/pages/helloWorld.js"
import Registration from "./components/pages/registration/registration"
import Header from "./components/common/header"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/" exact component={Welcome}/>
        <Route path="/registration" component={Registration}/>
      </div>
    );
  }
}

export default App;
