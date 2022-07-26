
import { NavLink, Routes, Route } from 'react-router-dom';
// import './App.css';
import Home from './components/Home';
import {Department} from './components/Department';
import Employee from './components/Employee';
import React from 'react';

function App() {
  return (
  <React.Fragment>
    <div className="App container">
        <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>
        </div>
      
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Home
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
             Department
            </NavLink>
            <NavLink className="btn btn-light btn-outline-primary" to="/employees">
              Employees
            </NavLink>

            

          </li>
        </ul>
      </nav>
      <Routes>
              <Route path={'/home'} element={<Home/>}/>
              <Route path={'/employees'} element={<Employee/>}/>
              <Route path={'/department'} element={<Department/>}/>
            </Routes>
    </React.Fragment>
  );
}

export default App;
