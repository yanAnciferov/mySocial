// import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory'

// import Welcome from "./components/helloWorld.js"
// import Registration from "./components/registration"

// const history = createBrowserHistory();

// class App extends Component {
//   render() {
//     return (
//       <Router history={history}>
//           <div>
//               <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/registration">Registration</Link></li>
//               </ul>

//               <hr/>

//               <Route path="/" сomponent={Welcome} /> 
//               <Route path="/registration" сomponent={Registration} /> 

//           </div>
//       </Router>
//     );
//   }
// }

// export default App;




import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';


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
