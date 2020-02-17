import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/AllUsers'
import Register from './components/Register'
import Login from './components/Login'
import UserHome from './components/UserHome'




function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Home</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/allusers" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="nav-link">Register Now</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/allusers" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/UserHome" component={UserHome}/>


      </div>
    </Router>
  );
}

export default App;
