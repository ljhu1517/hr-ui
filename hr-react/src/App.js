import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import AddNewEmployee from './AddNewEmployee';
import EditEmployee from "./EditEmployee";
import ViewAll from "./ViewAll";

import './App.css';

class App extends Component {

  render() {
    const addNewEmployeePath =   "/AddNewEmployee";
    const editEmployeePath = "/EditEmployee";
    const viewAllPath = "/ViewAll";

    return (
      <div> 

        <Router> 
          <Switch>
            <Route path = {addNewEmployeePath} component = {AddNewEmployee} />
            <Route path = {editEmployeePath} component = {EditEmployee} />
            <Route path = {viewAllPath} component = {ViewAll} /> 
          </Switch>
        </Router>

        {/* <header> 
          <h1 className="App-title"> HR App </h1>
        </header>
        <p> Start </p> */}
      </div>
    );
  }
}

export default App;

// class App extends Component {

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload. This is the starter page. 
//         </p>
//       </div>
//     );
//   }
// }